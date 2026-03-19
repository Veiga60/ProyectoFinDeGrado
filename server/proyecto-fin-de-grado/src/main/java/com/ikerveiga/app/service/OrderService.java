package com.ikerveiga.app.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.dao.OrderRepository;
import com.ikerveiga.app.entity.Order;
import com.ikerveiga.app.entity.OrderType;

@Service
public class OrderService {

    private OrderRepository orderDAO;

    @Autowired
    public OrderService(OrderRepository orderDAO) {
        this.orderDAO = orderDAO;
    }

    public Order getNextOrder() {
        List<Order> orders = orderDAO.findNextOrders();

        return orders.getFirst();
    }

    public void createOrder(LocalDate deadline, OrderType type) {
        Order existingOrder = orderDAO.findByDeadlineAndType(deadline, type.getId());

        Order order = new Order(deadline, type, new ArrayList<>());

        if (existingOrder != null) {
            throw new RuntimeException("Order already exists");
        }

        orderDAO.save(order);
    }
}
