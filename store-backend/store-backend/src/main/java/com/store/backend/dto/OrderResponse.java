package com.store.backend.dto;



import com.store.backend.model.Order;
import lombok.AllArgsConstructor;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
public class OrderResponse {
    private Long orderId;
    private Long userId;
    private List<OrderItemResponse> items;
    private BigDecimal totalAmount;
    private Order.Status status;
    private LocalDateTime createdAt;
}