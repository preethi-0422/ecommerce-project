package com.store.backend.controller;

import com.store.backend.model.Product;
import com.store.backend.service.ProductService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminController {

    private final ProductService productService;

    public AdminController(ProductService productService) {
        this.productService = productService;
    }

    // Add product
    @PostMapping("/product")
    public Product addProduct(@RequestBody Product product) {
        return productService.saveProduct(product);
    }

    // Update product
    @PutMapping("/product/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product product) {
        return productService.updateProduct(id, product);
    }

    // Delete product
    @DeleteMapping("/product/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }
}