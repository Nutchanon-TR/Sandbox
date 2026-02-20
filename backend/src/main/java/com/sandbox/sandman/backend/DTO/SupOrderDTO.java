package com.sandbox.sandman.backend.DTO;

import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SupOrderDTO {
    private Integer orderId;
    private String supplierName;
    private String contactPerson;
    private LocalDate orderDate;
    private LocalDate deliveryDate;
    private String status;
    private String notes;
}