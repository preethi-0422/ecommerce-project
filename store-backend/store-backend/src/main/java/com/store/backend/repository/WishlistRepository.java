package com.store.backend.repository;

import com.store.backend.model.Product;
import com.store.backend.model.User;
import com.store.backend.model.WishList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WishlistRepository extends JpaRepository<WishList, Long> {

    List<WishList> findByUser(User user);

    boolean existsByUserAndProduct(User user, Product product);

    void deleteByIdAndUser(Long id, User user);
}