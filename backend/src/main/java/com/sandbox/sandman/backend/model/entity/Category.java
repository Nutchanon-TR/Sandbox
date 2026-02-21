package com.sandbox.sandman.backend.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id", nullable = false)
    private Integer id;

    @Size(max = 50)
    @NotNull
    @Column(name = "category_name", nullable = false, length = 50)
    private String categoryName;

    @Lob
    @Column(name = "description")
    private String description;

}