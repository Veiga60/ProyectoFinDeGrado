package com.ikerveiga.app.facade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ikerveiga.app.dto.OrderDTO;
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
            orderService.createOrder(order.getDeadline(), order.getType().getId());
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/orders/{orderId}")
    public ResponseEntity<Void> expireOrder(@PathVariable("orderId") long orderId,
            @RequestParam("isExcelDownloaded") boolean isExcelDownloaded) {
        try {
            orderService.expireOrder(orderId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("Order not found")) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }
}
