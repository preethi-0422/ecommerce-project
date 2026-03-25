package com.store.backend.controller;

import com.store.backend.model.Category;
import com.store.backend.repository.CategoryRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin
public class CategoryController {

    private final CategoryRepository repo;

    public CategoryController(CategoryRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Category> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public Category create(@RequestBody Category category) {
        return repo.save(category);
    }
}