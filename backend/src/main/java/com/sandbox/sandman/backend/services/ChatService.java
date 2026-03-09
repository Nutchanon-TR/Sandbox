// backend/src/main/java/com/sandbox/sandman/backend/services/ChatService.java
package com.sandbox.sandman.backend.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ChatService {

    @Value("${ai.api-url}")
    private String apiUrl;

    @Value("${ai.api-key}")
    private String apiKey;

    @Value("${ai.model}")
    private String model;

    public String getAiResponse(String userMessage) {
        RestTemplate restTemplate = new RestTemplate();

        // 1. จัดเตรียม Header (ใส่ API Key)
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        // 2. จัดเตรียม ข้อความ (Hardcode Context + User Message)
        List<Map<String, String>> messages = new ArrayList<>();

        // --- Hardcode Context ไว้ที่นี่ ---
        Map<String, String> systemMessage = new HashMap<>();
        systemMessage.put("role", "system");
        systemMessage.put("content", "คุณคือผู้ช่วย AI อัจฉริยะประจำโปรเจกต์ Sandbox คุณเชี่ยวชาญด้าน Software Engineering โดยเฉพาะ Java, Spring Boot, และ React/Next.js ให้ตอบคำถามแบบกระชับ ตรงประเด็น และสุภาพเสมอ");
        messages.add(systemMessage);

        // ข้อความจากผู้ใช้งาน
        Map<String, String> userMessageMap = new HashMap<>();
        userMessageMap.put("role", "user");
        userMessageMap.put("content", userMessage);
        messages.add(userMessageMap);

        // 3. จัดเตรียม Body สำหรับยิง API
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", model);
        requestBody.put("messages", messages);
        requestBody.put("temperature", 0.7); // ปรับความครีเอทีฟ (0.0 - 2.0)

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            // 4. ยิง API
            ResponseEntity<Map> response = restTemplate.exchange(
                    apiUrl,
                    HttpMethod.POST,
                    entity,
                    Map.class
            );

            // 5. แกะเอาเฉพาะข้อความคำตอบออกมา
            Map<String, Object> responseBody = response.getBody();
            if (responseBody != null && responseBody.containsKey("choices")) {
                List<Map<String, Object>> choices = (List<Map<String, Object>>) responseBody.get("choices");
                if (!choices.isEmpty()) {
                    Map<String, Object> messageObj = (Map<String, Object>) choices.get(0).get("message");
                    return (String) messageObj.get("content");
                }
            }
            return "ไม่สามารถดึงคำตอบจาก AI ได้";

        } catch (Exception e) {
            e.printStackTrace();
            return "เกิดข้อผิดพลาดในการเชื่อมต่อกับ AI: " + e.getMessage();
        }
    }
}