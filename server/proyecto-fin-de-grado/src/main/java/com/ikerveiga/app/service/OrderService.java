package com.ikerveiga.app.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.dao.OrderRepository;
import com.ikerveiga.app.dao.OrderTypeRepository;
import com.ikerveiga.app.entity.Order;
import com.ikerveiga.app.entity.OrderType;

@Service
public class OrderService {

    private OrderRepository orderDAO;
    private com.ikerveiga.app.dao.OrderTypeRepository orderTypeDAO;

    @Autowired
    public OrderService(OrderRepository orderDAO, OrderTypeRepository orderTypeDAO) {
        this.orderDAO = orderDAO;
        this.orderTypeDAO = orderTypeDAO;
    }

    public Order getNextOrder(long typeId) {
        List<Order> orders = orderDAO.findNextOrdersOfType(typeId);

        if (orders.isEmpty()) {
            throw new RuntimeException("There are no orders");
        }

        return orders.getFirst();
    }

    public void createOrder(LocalDateTime deadline, long typeId) {
        OrderType orderType = orderTypeDAO.findById(typeId);
        if (orderType == null) {
            throw new RuntimeException("Order type not found");
        }
        Order existingOrder = orderDAO.findByDeadlineAndType(deadline, typeId);

        Order order = new Order(deadline, orderType, new ArrayList<>());

        if (existingOrder != null) {
            throw new RuntimeException("Order already exists");
        }

        orderDAO.save(order);
    }

    public void expireOrder(long orderId) {
        Order order = orderDAO.findById(orderId);

        if (order == null) {
            throw new RuntimeException("Order not found");
        }

        order.setIsExcelDownloaded(true);

        orderDAO.save(order);
    }
}
