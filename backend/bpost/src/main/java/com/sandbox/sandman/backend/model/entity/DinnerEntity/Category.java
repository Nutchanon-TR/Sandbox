package com.sandbox.sandman.backend.model.entity.DinnerEntity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

@Getter
@Setter
@Entity
@Table(name = "categories", schema = "dinner")
public class Category {
    @Id
    @Column(name = "category_id", nullable = false)
    private Integer id;

    @Size(max = 50)
    @NotNull
    @Nationalized
    @Column(name = "category_name", nullable = false, length = 50)
    private String categoryName;

    @Nationalized
    @Lob
    @Column(name = "description")
    private String description;

}