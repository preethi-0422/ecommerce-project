package com.store.backend.controller;

import com.store.backend.model.Category;
import com.store.backend.repository.CategoryRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoryController {

    private final CategoryRepository repo;

    public CategoryController(CategoryRepository repo) {
        this.repo = repo;
    }

    // ✅ Get all categories
    @GetMapping
    public List<Category> getAll() {
        return repo.findAll();
    }

    // ✅ Get by ID
    @GetMapping("/{id}")
    public Category getById(@PathVariable Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
    }

    @PostMapping
    public Category create(@RequestBody Category category) {
        if (repo.findAll().stream()
                .anyMatch(c -> c.getName().equalsIgnoreCase(category.getName()))) {
            throw new RuntimeException("Category already exists");
        }
        return repo.save(category);
    }

    // ✅ Update category (IMPORTANT)
    @PutMapping("/{id}")
    public Category update(@PathVariable Long id, @RequestBody Category updated) {
        Category category = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        category.setName(updated.getName());

        return repo.save(category);
    }

    // ✅ Delete category (IMPORTANT)
    @DeleteMapping("/{id}")
    public String deleteCategory(@PathVariable Long id) {
        repo.deleteById(id);
        return "Category deleted successfully";
    }
    }
