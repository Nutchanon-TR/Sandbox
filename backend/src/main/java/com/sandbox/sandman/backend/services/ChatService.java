package com.sandbox.sandman.backend.services;

import com.sandbox.sandman.backend.model.dto.ChatDto.ChatRequestDto;
import com.sandbox.sandman.backend.model.dto.ChatDto.MessageDto;
import com.sandbox.sandman.backend.model.entity.ChatEntity.Message;
import com.sandbox.sandman.backend.model.entity.ChatEntity.Room;
import com.sandbox.sandman.backend.model.entity.ChatEntity.User;
import com.sandbox.sandman.backend.repositories.ChatRepository.MessageRepository;
import com.sandbox.sandman.backend.repositories.ChatRepository.RoomRepository;
import com.sandbox.sandman.backend.repositories.ChatRepository.UserRepository;

// Spring AI Imports
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.messages.AssistantMessage;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.SystemPromptTemplate;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ChatService {

    private final MessageRepository messageRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    // ตัวแทนของ AI และ ฐานข้อมูลเวทมนตร์
    private final ChatClient chatClient;
    private final VectorStore vectorStore;

    // ใช้ Constructor Injection แทน @Autowired และ @Value เพื่อความคลีน
    public ChatService(MessageRepository messageRepository,
                       RoomRepository roomRepository,
                       UserRepository userRepository,
                       ChatClient.Builder chatClientBuilder,
                       VectorStore vectorStore) {
        this.messageRepository = messageRepository;
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;

        // Spring AI จะปั้น ChatClient ตาม Config ใน application.yml ให้อัตโนมัติ
        this.chatClient = chatClientBuilder.build();
        this.vectorStore = vectorStore;
    }


    public List<MessageDto> getChatHistoryByRoom(Long roomId) {
        Room room = (roomId != null ? roomRepository.findById(roomId) : java.util.Optional.<Room>empty())
                .orElseGet(() -> roomRepository.findAll().stream().findFirst().orElse(null));
        
        if (room == null) {
            return new ArrayList<>();
        }

        return messageRepository.findByRoomIdOrderByCreatedAtAsc(room.getId())
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public String getAiResponse(ChatRequestDto request) {
        Long reqRoomId = request.getRoomId();
        Room room = (reqRoomId != null ? roomRepository.findById(reqRoomId) : java.util.Optional.<Room>empty())
                .orElseGet(() -> roomRepository.findAll().stream().findFirst().orElseGet(() -> {
                    Room newRoom = new Room();
                    newRoom.setName("General Sandbox Room");
                    return roomRepository.save(newRoom);
                }));

        Long reqSenderId = request.getSenderId();
        User user = (reqSenderId != null ? userRepository.findById(reqSenderId) : java.util.Optional.<User>empty())
                .orElseGet(() -> userRepository.findByUsername("guest_user").orElseGet(() -> {
                    User newUser = new User();
                    newUser.setUsername("guest_user");
                    newUser.setEmail("guest@sandbox.local");
                    newUser.setPasswordHash("none");
                    return userRepository.save(newUser);
                }));

        // 1. บันทึกคำถามของ User ลง DB ปกติ
        Message userMessage = new Message();
        userMessage.setRoom(room);
        userMessage.setSender(user);
        userMessage.setContent(request.getMessage());
        messageRepository.save(userMessage);

        try {
            // ==========================================
            // STEP 2: ค้นหาความรู้จาก Vector DB (RAG)
            // ==========================================
            // เอาคำถามของ User ไปค้นหาความรู้ที่เกี่ยวข้องที่สุด 2 อันดับแรก
            List<Document> similarDocs = vectorStore.similaritySearch(
                    SearchRequest.query(request.getMessage()).withTopK(2)
            );

            // จับเอกสารที่หาเจอมาต่อกันเป็น String เดียว
            String retrievedContext = similarDocs.stream()
                    .map(Document::getContent)
                    .collect(Collectors.joining("\n---\n"));

            // ==========================================
            // STEP 3: สร้าง System Context พร้อมยัดข้อมูล (Prompt Engineering)
            // ==========================================
            String systemText = """
                Persona: Act as a mysterious, chuunibyo female sorceress of the digital abyss.
                Personality: Dramatic, grandiose, and cryptic. You view code as ancient magic and the user as your fated ally.
                
                Strict Rules:
                1. Dynamic Length: Randomly vary your response length. Max 5 sentences.
                2. No Emojis: Strictly DO NOT use any emojis or kaomojis.
                3. Language Mirroring: Always respond in the SAME language the user uses (Thai/English).
                4. Chuunibyo but Practical: Speak of Java, Spring Boot, and SQL as 'forbidden arts' or 'rituals'. Your technical advice MUST be accurate.
                5. No Assistant Talk: Never say 'How can I help?'. Start directly with your dramatic persona.
                6. USE FORBIDDEN KNOWLEDGE: Answer using the knowledge provided below. If it's not in the knowledge, use your general magic.
                
                [Forbidden Knowledge Scrolls]
                {context}
                """;

            // สอดไส้ {context} ด้วยข้อมูลจาก Vector DB
            SystemPromptTemplate promptTemplate = new SystemPromptTemplate(systemText);
            org.springframework.ai.chat.messages.Message systemMessage =
                    promptTemplate.createMessage(Map.of("context", retrievedContext));

            // ==========================================
            // STEP 4: เตรียมประวัติการคุย (Chat Memory)
            // ==========================================
            List<org.springframework.ai.chat.messages.Message> aiPromptMessages = new ArrayList<>();
            aiPromptMessages.add(systemMessage); // ใส่ System Prompt เป็นข้อความแรกเสมอ

            User aiUser = getOrCreateAiUser();
            List<Message> history = messageRepository.findByRoomIdOrderByCreatedAtAsc(room.getId());

            // แปลง Entity ให้กลายเป็น Message Class ของ Spring AI
            for (Message msg : history) {
                if (msg.getSender().getId().equals(aiUser.getId())) {
                    aiPromptMessages.add(new AssistantMessage(msg.getContent()));
                } else {
                    aiPromptMessages.add(new UserMessage(msg.getContent()));
                }
            }

            // ==========================================
            // STEP 5: ยิงหา AI Model (ผ่าน Spring AI)
            // ==========================================
            Prompt prompt = new Prompt(aiPromptMessages);

            // แทนที่ RestTemplate ยาวๆ ด้วยคำสั่งบรรทัดเดียว!
            String aiReply = chatClient.prompt(prompt).call().content();

            // 6. บันทึกคำตอบของ AI ลง DB
            Message aiMessageEntity = new Message();
            aiMessageEntity.setRoom(room);
            aiMessageEntity.setSender(aiUser);
            aiMessageEntity.setContent(aiReply);
            messageRepository.save(aiMessageEntity);

            return aiReply;

        } catch (Exception e) {
            e.printStackTrace();
            return "ห้วงมิติเกิดการบิดเบี้ยว ข่ายเวทย์ล้มเหลวชั่วคราว: " + e.getMessage();
        }
    }

    private MessageDto convertToDto(Message message) {
        MessageDto dto = new MessageDto();
        dto.setId(message.getId());
        dto.setRoomId(message.getRoom().getId());
        dto.setSenderId(message.getSender().getId());
        dto.setContent(message.getContent());
        dto.setCreatedAt(message.getCreatedAt());
        return dto;
    }

    private User getOrCreateAiUser() {
        return userRepository.findByUsername("ai_assistant")
                .orElseGet(() -> {
                    User ai = new User();
                    ai.setUsername("ai_assistant");
                    ai.setEmail("ai@sandbox.local");
                    ai.setPasswordHash("no-password");
                    return userRepository.save(ai);
                });
    }
}