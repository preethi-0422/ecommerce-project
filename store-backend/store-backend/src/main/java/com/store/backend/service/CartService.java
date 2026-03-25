package com.store.backend.service;

import com.store.backend.model.Cart;
import com.store.backend.model.CartItem;
import com.store.backend.model.Product;
import com.store.backend.model.User;
import com.store.backend.repository.CartItemRepository;
import com.store.backend.repository.CartRepository;
import com.store.backend.repository.ProductRepository;
import com.store.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepo;
    private final CartItemRepository cartItemRepo;
    private final UserRepository userRepo;
    private final ProductRepository productRepo;

    public Cart getCartByUsername(String username) {
        return getOrCreateCart(username);
    }

    public Cart addItem(String username, Long productId, int quantity) {
        Cart cart = getOrCreateCart(username);
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        cart.getItems().stream()
                .filter(i -> i.getProduct().getId().equals(productId))
                .findFirst()
                .ifPresentOrElse(
                        item -> item.setQuantity(item.getQuantity() + quantity),
                        () -> cart.getItems().add(new CartItem(null, cart, product, quantity))
                );

        return cartRepo.save(cart);
    }

    public Cart updateQuantity(String username, Long itemId, int quantity) {
        Cart cart = getOrCreateCart(username);
        cart.getItems().stream()
                .filter(i -> i.getId().equals(itemId))
                .findFirst()
                .ifPresent(item -> item.setQuantity(quantity));
        return cartRepo.save(cart);
    }

    public void removeItem(String username, Long itemId) {
        Cart cart = getOrCreateCart(username);
        cart.getItems().removeIf(i -> i.getId().equals(itemId));
        cartRepo.save(cart);
    }

    public void clearCart(String username) {
        Cart cart = getOrCreateCart(username);
        cart.getItems().clear();
        cartRepo.save(cart);
    }

    private Cart getOrCreateCart(String username) {
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return cartRepo.findByUser(user)
                .orElseGet(() -> cartRepo.save(new Cart(null, user, new ArrayList<>())));
    }
}
