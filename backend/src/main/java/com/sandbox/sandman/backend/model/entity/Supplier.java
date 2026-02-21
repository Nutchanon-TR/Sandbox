package com.sandbox.sandman.backend.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "suppliers")
public class Supplier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "supplier_id", nullable = false)
    private Integer id;

    @Size(max = 100)
    @NotNull
    @Column(name = "supplier_name", nullable = false, length = 100)
    private String supplierName;

    @Size(max = 50)
    @NotNull
    @Column(name = "contact_person", nullable = false, length = 50)
    private String contactPerson;

    @Size(max = 20)
    @NotNull
    @Column(name = "phone", nullable = false, length = 20)
    private String phone;

    @Size(max = 100)
    @NotNull
    @Column(name = "email", nullable = false, length = 100)
    private String email;

    @NotNull
    @Lob
    @Column(name = "address", nullable = false)
    private String address;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "created_at")
    private Instant createdAt;

}