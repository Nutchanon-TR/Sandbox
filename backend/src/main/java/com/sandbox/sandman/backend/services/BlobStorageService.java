package com.sandbox.sandman.backend.services;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobServiceClient;
import com.sandbox.sandman.backend.config.AppConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
public class BlobStorageService {

    private final BlobServiceClient blobServiceClient;

    @Autowired
    AppConfig appConfig;

    public BlobStorageService(BlobServiceClient blobServiceClient) {
        this.blobServiceClient = blobServiceClient;
    }

    public ResponseEntity<ByteArrayResource> uploadImage(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Your uploaded file is null or empty");
        }
        try {
            // Keep file image into container
            BlobContainerClient containerClient = blobServiceClient.getBlobContainerClient(appConfig.getImageContainerName());
            String uniqueFilename = UUID.randomUUID()+"_"+file.getOriginalFilename();
            BlobClient blobClient = containerClient.getBlobClient(uniqueFilename);
            blobClient.upload(file.getInputStream(), file.getSize(), true);

            //return file image that you input
            ByteArrayResource resource = new ByteArrayResource(file.getBytes());
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + file.getOriginalFilename() + "\"")
                    .contentType(MediaType.parseMediaType(file.getContentType()))
                    .contentLength(file.getSize())
                    .body(resource);
        } catch (Exception e) {
            throw new RuntimeException("Error image upload failed " + e.getMessage(), e);
        }
    }
}