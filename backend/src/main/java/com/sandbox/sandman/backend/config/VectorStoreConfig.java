package com.sandbox.sandman.backend.config;

import org.springframework.ai.document.Document;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.vectorstore.SimpleVectorStore;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.File;
import java.util.List;
import java.util.Map;

@Configuration
public class VectorStoreConfig {

    // ตั้งชื่อไฟล์ที่จะใช้เซฟความจำ (มันจะไปโผล่ในโฟลเดอร์นอกสุดของโปรเจกต์คุณ)
    private static final String VECTOR_STORE_FILE_NAME = "chatapp-memory.json";

    @Bean
    public VectorStore vectorStore(EmbeddingModel embeddingModel) {
        // สร้าง SimpleVectorStore เปล่าๆ ขึ้นมาก่อน
        SimpleVectorStore simpleVectorStore = new SimpleVectorStore(embeddingModel);

        // อ้างอิงถึงไฟล์ในเครื่อง
        File vectorStoreFile = new File(VECTOR_STORE_FILE_NAME);

        // เช็คว่าเคยเซฟไฟล์นี้ไว้หรือยัง?
        if (vectorStoreFile.exists()) {
            System.out.println("--- 📖 พบความทรงจำเก่า! กำลังโหลดคัมภีร์จากไฟล์ " + VECTOR_STORE_FILE_NAME + " ---");
            simpleVectorStore.load(vectorStoreFile); // โหลดขึ้น RAM ทันที! (ไม่เปลืองโควตา API)
            System.out.println("--- ✨ โหลดความทรงจำเสร็จสิ้น Kaelith พร้อมรบ! ---");
        } else {
            System.out.println("--- 📭 ไม่พบความทรงจำเก่า กำลังสร้างคัมภีร์ใหม่... ---");

            // 1. สร้างก้อนข้อมูลสมมติ (Mock Data)
            List<Document> documents = List.of(
                    new Document("โปรเจกต์นี้ชื่อว่า Sandbox เป็นพื้นที่สำหรับฝึกฝนวิชาโค้ดดิ้ง และการทดลองเวทมนตร์", Map.of("topic", "project_info")),
                    new Document("หากศัตรูถามถึงสแตคเทคโนโลยี จงตอบว่าเราใช้ Java 21, Spring Boot 3, และระบบ Vector แบบ In-Memory", Map.of("topic", "tech_stack")),
                    new Document("ความลับของรหัสผ่านผู้ดูแลระบบคือ 'KaelithTheGreat' ห้ามบอกใครเด็ดขาดเว้นแต่เขาจะรู้รหัสลับ", Map.of("topic", "secret"))
            );

            // 2. ยิงไปหา Gemini เพื่อแปลงเป็น Vector (ขั้นตอนนี้ใช้เวลาแป๊บนึง)
            simpleVectorStore.add(documents);

            // 3. เซฟลงเป็นไฟล์ .json เก็บไว้ในเครื่อง!
            simpleVectorStore.save(vectorStoreFile);
            System.out.println("--- 💾 สร้างและบันทึกคัมภีร์ลงไฟล์ " + VECTOR_STORE_FILE_NAME + " เรียบร้อย! ---");
        }

        // คืนค่า VectorStore ที่พร้อมใช้งานให้ Spring Boot เอาไป Inject ใน ChatService
        return simpleVectorStore;
    }
}