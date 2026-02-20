package com.sandbox.sandman.backend.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Getter
@Configuration
public class AppConfig {
    @Value("${azure.storage.container-name:images}")
    private String imageContainerName;
}
