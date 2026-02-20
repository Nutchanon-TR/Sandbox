package com.sandbox.sandman.backend.controllers;

import com.sandbox.sandman.backend.DTO.SupOrderDTO;
import com.sandbox.sandman.backend.services.OperatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/operator")
@ConfigurationProperties(prefix = "app.cors")
public class SupOrderController {
    @Autowired
    private OperatorService operatorService;

    @GetMapping("/supOrderList")
    public ResponseEntity<List<SupOrderDTO>> AllSupplierOrders() {
        return ResponseEntity.ok(operatorService.getAllSupplierOrders());
    }
}
