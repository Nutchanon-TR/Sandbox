// backend/src/main/java/com/sandbox/sandman/backend/controllers/ChatController.java
package com.sandbox.sandman.backend.controllers;

import com.sandbox.sandman.backend.model.dto.ChatDto.ChatRequestDto;
import com.sandbox.sandman.backend.model.dto.ChatDto.ChatResponseDto;
import com.sandbox.sandman.backend.services.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${app.api.prefix.chat}")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping
    public ResponseEntity<ChatResponseDto> chatWithAi(@RequestBody ChatRequestDto request) {
        String reply = chatService.getAiResponse(request.getMessage());
        return ResponseEntity.ok(new ChatResponseDto(reply));
    }
}