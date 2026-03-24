package com.store.backend.service;

import com.store.backend.model.Product;
import com.store.backend.model.User;
import com.store.backend.model.WishList;
import com.store.backend.repository.ProductRepository;
import com.store.backend.repository.UserRepository;
import com.store.backend.repository.WishlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WishlistService {

    private final WishlistRepository wishlistRepo;
    private final UserRepository userRepo;
    private final ProductRepository productRepo;

    public List<WishList> getWishlist(String username) {
        User user = getUser(username);
        return wishlistRepo.findByUser(user);
    }

    public WishList addItem(String username, Long productId) {
        User user = getUser(username);
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // prevent duplicates
        if (wishlistRepo.existsByUserAndProduct(user, product)) {
            throw new RuntimeException("Product already in wishlist");
        }

        WishList item = new WishList();
        item.setUser(user);
        item.setProduct(product);
        return wishlistRepo.save(item);
    }

    public void removeItem(String username, Long itemId) {
        User user = getUser(username);
        wishlistRepo.deleteByIdAndUser(itemId, user);
    }

    public void clearWishlist(String username) {
        User user = getUser(username);
        List<WishList> items = wishlistRepo.findByUser(user);
        wishlistRepo.deleteAll(items);
    }

    private User getUser(String username) {
        return userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
