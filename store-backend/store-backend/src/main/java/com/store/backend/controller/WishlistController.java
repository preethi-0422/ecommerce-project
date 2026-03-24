package com.store.backend.controller;

import com.store.backend.model.WishList;
import com.store.backend.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
public class WishlistController {

    private final WishlistService wishlistService;

    @GetMapping
    public ResponseEntity<List<WishList>> getWishlist(Principal principal) {
        return ResponseEntity.ok(wishlistService.getWishlist(principal.getName()));
    }

    @PostMapping("/add")
    public ResponseEntity<WishList> addItem(
            @RequestBody Map<String, Object> body,
            Principal principal) {
        Long productId = Long.valueOf(body.get("productId").toString());
        return ResponseEntity.ok(wishlistService.addItem(principal.getName(), productId));
    }

    @DeleteMapping("/remove/{itemId}")
    public ResponseEntity<Void> removeItem(
            @PathVariable Long itemId,
            Principal principal) {
        wishlistService.removeItem(principal.getName(), itemId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearWishlist(Principal principal) {
        wishlistService.clearWishlist(principal.getName());
        return ResponseEntity.noContent().build();
    }
}
