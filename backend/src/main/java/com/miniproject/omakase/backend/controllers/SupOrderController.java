package com.miniproject.omakase.backend.controllers;

import com.miniproject.omakase.backend.DTO.SupOrderDTO;
import com.miniproject.omakase.backend.excel.ExcelGenerator;
import com.miniproject.omakase.backend.repositories.SupOrderRepository;
import com.miniproject.omakase.backend.services.FigureService;
import com.miniproject.omakase.backend.services.OperatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
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
    @Autowired
    private FigureService figureService;

    @GetMapping("/supOrderList")
    public ResponseEntity<List<SupOrderDTO>> AllSupplierOrders() {
        return ResponseEntity.ok(operatorService.getAllSupplierOrders());
    }

    @GetMapping("/gen-excel")
    public ResponseEntity<String> generate() {
        String path = "output/report.xlsx";
        figureService.ExcelGenerator(path);
        return ResponseEntity.ok("Excel created at: " + path);
    }

}
