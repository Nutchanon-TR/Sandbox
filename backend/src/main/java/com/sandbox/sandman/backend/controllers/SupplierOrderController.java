package com.sandbox.sandman.backend.controllers;

import lombok.extern.slf4j.Slf4j;
import com.sandbox.sandman.backend.model.dto.SupplierOrderDTO;
import com.sandbox.sandman.backend.services.SupplierOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("${app.api.prefix.supplier-order}")
@Slf4j
public class SupplierOrderController {
    @Autowired
    private SupplierOrderService supplierOrderService;

    @GetMapping("/inquiry")
    public ResponseEntity<List<SupplierOrderDTO>> AllSupplierOrders() {
        return ResponseEntity.ok(supplierOrderService.getAllSupplierOrders());
    }
}
