package com.store.backend.repository;

import com.store.backend.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
     CartItem findByCartIdAndProductId(Long cartId, Long productId);
}
