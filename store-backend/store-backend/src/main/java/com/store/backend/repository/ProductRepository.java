package com.store.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.store.backend.model.Product;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryId(Long categoryId);
}