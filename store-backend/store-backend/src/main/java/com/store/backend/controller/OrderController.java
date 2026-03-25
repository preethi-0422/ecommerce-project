package com.store.backend.controller;



import com.store.backend.dto.OrderRequest;
import com.store.backend.dto.OrderResponse;
import com.store.backend.model.Order;
import com.store.backend.model.User;
import com.store.backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    // TODO: replace hardcoded userId with JWT principal after Member 1 finishes auth
    // e.g. Long userId = ((UserDetails) authentication.getPrincipal()).getId();

    // Place a new order
    @PostMapping
    public ResponseEntity<OrderResponse> placeOrder(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody OrderRequest request) {
            Long userId = ((User) userDetails).getId();
        return ResponseEntity.ok(orderService.placeOrder(userId, request));
    }

    // Get all orders for a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderResponse>> getUserOrders(@PathVariable Long userId) {
        return ResponseEntity.ok(orderService.getOrdersByUser(userId));
    }

    // Get single order
    @GetMapping("/{orderId}")
    public ResponseEntity<OrderResponse> getOrder(@PathVariable Long orderId) {
        return ResponseEntity.ok(orderService.getOrderById(orderId));
    }

    // Cancel an order
    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<OrderResponse> cancelOrder(@PathVariable Long orderId) {
        return ResponseEntity.ok(orderService.cancelOrder(orderId));
    }

    // Admin — update order status
    @PutMapping("/{orderId}/status")
    public ResponseEntity<OrderResponse> updateStatus(
            @PathVariable Long orderId,
            @RequestParam Order.Status status) {
        return ResponseEntity.ok(orderService.updateStatus(orderId, status));
    }

    // Admin — get all orders
    @GetMapping("/admin/all")
    public ResponseEntity<List<OrderResponse>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }
}


