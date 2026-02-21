package com.sandbox.sandman.backend.model.dto;

import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SupplierOrderDTO {
    private Integer orderId;
    private String supplierName;
    private String contactPerson;
    private LocalDate orderDate;
    private LocalDate deliveryDate;
    private String status;
    private String notes;
}