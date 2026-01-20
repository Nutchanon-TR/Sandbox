package com.miniproject.omakase.backend.DTO;

import java.time.LocalDate;

public class OrderDetailDTO {
    private Integer supplierId;
    private String contactPerson;
    private String supplierName;
    private String phone;
    private String email;
    private String address;
    private Integer orderId;
    private LocalDate orderDate;
    private LocalDate deliveryDate;
    private String status; // ใช้ String สำหรับ ENUM
    private String notes;
}
