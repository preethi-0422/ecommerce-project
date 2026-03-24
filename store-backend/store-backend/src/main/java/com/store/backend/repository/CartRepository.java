package com.store.backend.repository;

import com.store.backend.model.Cart;
import com.store.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUser(User user);
    // or traverse the nested field:
    Optional<Cart> findByUserUsername(String username);
}
