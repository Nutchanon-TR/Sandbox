package com.sandbox.sandman.backend.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "ingredients")
public class Ingredient {
    @Id
    @Column(name = "ingredient_id", nullable = false)
    private Integer id;

    @Size(max = 100)
    @NotNull
    @Column(name = "ingredient_name", nullable = false, length = 100)
    private String ingredientName;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Size(max = 20)
    @NotNull
    @Column(name = "unit", nullable = false, length = 20)
    private String unit;

    @Lob
    @Column(name = "description")
    private String description;

}