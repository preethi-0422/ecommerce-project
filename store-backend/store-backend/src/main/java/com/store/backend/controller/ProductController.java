package com.store.backend.controller;

import com.store.backend.model.Product;
import com.store.backend.repository.ProductRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    private final ProductRepository repo;

    public ProductController(ProductRepository repo) {
        this.repo = repo;
    }

    // ✅ Get all products
    @GetMapping("/products")
    public List<Product> getAll() {
        return repo.findAll();
    }

    // ✅ Get by ID
    @GetMapping("/products/{id}")
    public Product getById(@PathVariable Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    // ✅ CREATE PRODUCT (IMPORTANT)
    @PostMapping("/admin/products")
    public Product create(@RequestBody Product product) {
        return repo.save(product);
    }

    // ✅ UPDATE PRODUCT
    @PutMapping("/admin/products/{id}")
    public Product update(@PathVariable Long id, @RequestBody Product updated) {
        Product p = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        p.setName(updated.getName());
        p.setPrice(updated.getPrice());
        p.setDescription(updated.getDescription());
        p.setStock(updated.getStock());
        p.setCategory(updated.getCategory());

        return repo.save(p);
    }

    // ✅ DELETE PRODUCT
    @DeleteMapping("/admin/products/{id}")
    public String delete(@PathVariable Long id) {
        repo.deleteById(id);
        return "Deleted successfully";
    }
}