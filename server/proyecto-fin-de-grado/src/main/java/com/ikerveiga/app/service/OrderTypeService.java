package com.ikerveiga.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.dao.OrderTypeRepository;
import com.ikerveiga.app.entity.OrderType;

@Service
public class OrderTypeService {

    OrderTypeRepository orderTypeDAO;

    @Autowired
    public OrderTypeService(OrderTypeRepository orderTypeDAO) {
        this.orderTypeDAO = orderTypeDAO;
    }

    public List<OrderType> getOrderTypes() {
        List<OrderType> orderTypes = orderTypeDAO.findAll();

        if (orderTypes.isEmpty()) {
            throw new RuntimeException("No order types found");
        }

        return orderTypes;
    }
}
