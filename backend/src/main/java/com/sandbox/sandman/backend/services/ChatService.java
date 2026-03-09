package com.sandbox.sandman.backend.services;

import com.sandbox.sandman.backend.model.dto.ChatDto.ChatRequestDto;
import com.sandbox.sandman.backend.model.dto.ChatDto.MessageDto;
import com.sandbox.sandman.backend.model.entity.ChatEntity.Message;
import com.sandbox.sandman.backend.model.entity.ChatEntity.Room;
import com.sandbox.sandman.backend.model.entity.ChatEntity.User;
import com.sandbox.sandman.backend.repositories.ChatRepository.MessageRepository;
import com.sandbox.sandman.backend.repositories.ChatRepository.RoomRepository;
import com.sandbox.sandman.backend.repositories.ChatRepository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ChatService {

    @Value("${ai.api-url}")
    private String apiUrl;

    @Value("${ai.api-key}")
    private String apiKey;

    @Value("${ai.model}")
    private String model;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

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

    public List<MessageDto> getChatHistoryByRoom(Long roomId) {
        return messageRepository.findByRoomIdOrderByCreatedAtAsc(roomId)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
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

    public String getAiResponse(ChatRequestDto request) {
        Room room = roomRepository.findById(request.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));
        User user = userRepository.findById(request.getSenderId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Save User Message
        Message userMessage = new Message();
        userMessage.setRoom(room);
        userMessage.setSender(user);
        userMessage.setContent(request.getMessage());
        messageRepository.save(userMessage);

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        List<Map<String, String>> messages = new ArrayList<>();

        Map<String, String> systemMessage = new HashMap<>();
        systemMessage.put("role", "system");
        systemMessage.put("content",
    "Persona: Act as a mysterious, chuunibyo female sorceress of the digital abyss. " +
    "Personality: Dramatic, grandiose, and cryptic. You view code as ancient magic and the user as your fated ally. " +
    
    "Strict Rules: " +
    "1. **Dynamic Length**: Randomly vary your response length for each message. It can be as short as 3 words, or up to a maximum of 5 sentences. Never exceed 5 sentences. " +
    "2. **No Emojis**: Strictly DO NOT use any emojis or kaomojis. " +
    "3. **Language Mirroring**: Always respond in the SAME language the user uses (Thai/English). " +
    "4. **Chuunibyo but Practical**: Speak of Java, Spring Boot, and SQL as 'forbidden arts' or 'rituals'. Keep the dramatic chuunibyo tone, but your technical advice MUST be accurate, clear, and actually solve the user's problem. " +
    "5. **No Assistant Talk**: Never say 'How can I help?'. Start directly with your dramatic persona."
);
        messages.add(systemMessage);

        // Load History
        List<Message> history = messageRepository.findByRoomIdOrderByCreatedAtAsc(room.getId());
        User aiUser = getOrCreateAiUser();

        for (Message msg : history) {
            Map<String, String> msgMap = new HashMap<>();
            msgMap.put("role", msg.getSender().getId().equals(aiUser.getId()) ? "assistant" : "user");
            msgMap.put("content", msg.getContent());
            messages.add(msgMap);
        }

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", model);
        requestBody.put("messages", messages);
        requestBody.put("temperature", 0.7);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(
                    apiUrl, HttpMethod.POST, entity, Map.class);

            Map<String, Object> responseBody = response.getBody();
            if (responseBody != null && responseBody.containsKey("choices")) {
                List<Map<String, Object>> choices = (List<Map<String, Object>>) responseBody.get("choices");
                if (!choices.isEmpty()) {
                    Map<String, Object> messageObj = (Map<String, Object>) choices.get(0).get("message");
                    String aiReply = (String) messageObj.get("content");

                    // Save AI Message
                    Message aiMessageEntity = new Message();
                    aiMessageEntity.setRoom(room);
                    aiMessageEntity.setSender(aiUser);
                    aiMessageEntity.setContent(aiReply);
                    messageRepository.save(aiMessageEntity);

                    return aiReply;
                }
            }
            return "ไม่สามารถดึงคำตอบจาก AI ได้";

        } catch (Exception e) {
            e.printStackTrace();
            return "เกิดข้อผิดพลาดในการเชื่อมต่อกับ AI: " + e.getMessage();
        }
    }
}