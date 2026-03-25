package com.store.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "products")
@Data @NoArgsConstructor @AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;  // changed from double

    @Column(nullable = false)
    private Integer stock;     // changed from int

    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}