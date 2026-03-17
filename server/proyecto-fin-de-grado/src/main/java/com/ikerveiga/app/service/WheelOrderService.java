package com.ikerveiga.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.dao.WheelOrderRepository;
import com.ikerveiga.app.entity.WheelOrder;

@Service
public class WheelOrderService {

    private WheelOrderRepository wheelOrderDAO;

    @Autowired
    public WheelOrderService(WheelOrderRepository wheelOrderDAO) {
        this.wheelOrderDAO = wheelOrderDAO;
    }

    public List<WheelOrder> getWheelOrders() {
        List<WheelOrder> wheelOrders = wheelOrderDAO.findAll();

        return wheelOrders;
    }
}
