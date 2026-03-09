package com.sandbox.sandman.backend.model.dto.ChatDto;

import lombok.Data;
import java.time.ZonedDateTime;

@Data
public class MessageDto {
    private Long id;
    private Long senderId;
    private Long roomId;
    private String content;
    private ZonedDateTime createdAt;
}
