package com.sandbox.sandman.backend.config;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.boot.web.client.RestClientCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpRequest;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

@Configuration
public class GeminiEmbeddingUsageInterceptorConfig {

    @Bean
    public RestClientCustomizer geminiEmbeddingUsageInterceptor() {
        return restClientBuilder -> restClientBuilder.requestInterceptor(new ClientHttpRequestInterceptor() {
            @Override
            public ClientHttpResponse intercept(HttpRequest request, byte[] body, ClientHttpRequestExecution execution) throws IOException {
                ClientHttpResponse response = execution.execute(request, body);
                
                // ตรวจสอบว่าเป็น Request ไปที่ /embeddings หรือไม่
                if (request.getURI().getPath().endsWith("/embeddings")) {
                    return new ModifiedClientHttpResponse(response);
                }
                
                return response;
            }
        });
    }

    private static class ModifiedClientHttpResponse implements ClientHttpResponse {
        private final ClientHttpResponse originalResponse;
        private byte[] modifiedBody;

        public ModifiedClientHttpResponse(ClientHttpResponse originalResponse) throws IOException {
            this.originalResponse = originalResponse;
            byte[] originalBodyBytes = originalResponse.getBody().readAllBytes();
            
            try {
                // อ่าน Response เดิม
                ObjectMapper mapper = new ObjectMapper();
                JsonNode rootNode = mapper.readTree(originalBodyBytes);
                
                // ตรวจสอบและเพิ่มฟิลด์ usage ถ้ายังไม่มี
                if (rootNode instanceof ObjectNode objectNode) {
                    if (!objectNode.has("usage") || objectNode.get("usage").isNull()) {
                        ObjectNode usageNode = mapper.createObjectNode();
                        usageNode.put("prompt_tokens", 0);
                        usageNode.put("total_tokens", 0);
                        objectNode.set("usage", usageNode);
                    }
                }
                
                this.modifiedBody = mapper.writeValueAsBytes(rootNode);
                
            } catch (Exception e) {
                // ถ้ามีปัญหาในการแปลง JSON (เช่น API คืน Error กลับมาแบบแปลกๆ) ก็ปล่อยผ่านไปใช้ตัวเดิม
                this.modifiedBody = originalBodyBytes;
            }
        }

        @Override
        public HttpHeaders getHeaders() {
            return originalResponse.getHeaders();
        }

        @Override
        public InputStream getBody() throws IOException {
            return new ByteArrayInputStream(modifiedBody);
        }

        @Override
        public org.springframework.http.HttpStatusCode getStatusCode() throws IOException {
            return originalResponse.getStatusCode();
        }

        @Override
        public String getStatusText() throws IOException {
            return originalResponse.getStatusText();
        }

        @Override
        public void close() {
            originalResponse.close();
        }
    }
}
