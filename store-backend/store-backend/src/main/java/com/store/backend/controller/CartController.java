package com.store.backend.controller;

import com.store.backend.model.Cart;
import com.store.backend.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<Cart> getCart(Principal principal) {
        return ResponseEntity.ok(cartService.getCartByUsername(principal.getName()));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addItem(
            @RequestBody Map<String, Object> body,
            Principal principal) {

        Object productObj = body.get("productId");
        Object quantityObj = body.get("quantity");

        if (productObj == null || quantityObj == null) {
            return ResponseEntity.badRequest()
                    .body("productId and quantity are required");
        }

        Long productId = Long.valueOf(productObj.toString());
        int quantity = Integer.parseInt(quantityObj.toString());

        return ResponseEntity.ok(
                cartService.addItem(principal.getName(), productId, quantity)
        );
    }

    @PutMapping("/update/{itemId}")
    public ResponseEntity<Cart> updateQty(
            @PathVariable Long itemId,
            @RequestBody Map<String, Object> body,
            Principal principal) {
        int quantity = Integer.parseInt(body.get("quantity").toString());
        return ResponseEntity.ok(cartService.updateQuantity(principal.getName(), itemId, quantity));
    }

    @DeleteMapping("/remove/{itemId}")
    public ResponseEntity<Void> removeItem(
            @PathVariable Long itemId,
            Principal principal) {
        cartService.removeItem(principal.getName(), itemId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart(Principal principal) {
        cartService.clearCart(principal.getName());
        return ResponseEntity.noContent().build();
    }
}