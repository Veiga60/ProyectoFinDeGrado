package com.ikerveiga.app.facade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ikerveiga.app.dto.OrderDTO;
import com.ikerveiga.app.entity.OrderType;
import com.ikerveiga.app.service.OrderService;

@RestController
public class OrderController {

    private OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/orders/next")
    public ResponseEntity<OrderDTO> getNextOrder(@RequestParam("typeId") long typeId) {
        try {
            OrderDTO orderDTO = orderService.getNextOrder(typeId).toDTO();
            return ResponseEntity.ok(orderDTO);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/orders")
    public ResponseEntity<Void> createOrder(@RequestBody OrderDTO order) {
        try {
            OrderType type = new OrderType(order.getType().getId(), order.getType().getDescription());
            orderService.createOrder(order.getDeadline(), type);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
