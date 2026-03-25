package com.ikerveiga.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.dao.OrderRepository;
import com.ikerveiga.app.dao.PlayerRepository;
import com.ikerveiga.app.dao.WheelHardnessRepository;
import com.ikerveiga.app.dao.WheelModelRepository;
import com.ikerveiga.app.dao.WheelOrderRepository;
import com.ikerveiga.app.dao.WheelSizeRepository;
import com.ikerveiga.app.entity.Order;
import com.ikerveiga.app.entity.Player;
import com.ikerveiga.app.entity.WheelHardness;
import com.ikerveiga.app.entity.WheelModel;
import com.ikerveiga.app.entity.WheelOrder;
import com.ikerveiga.app.entity.WheelSize;

@Service
public class WheelOrderService {

    private WheelOrderRepository wheelOrderDAO;
    private PlayerRepository playerDAO;
    private OrderRepository orderDAO;
    private WheelModelRepository wheelModelDAO;
    private WheelHardnessRepository wheelHardnessDAO;
    private WheelSizeRepository wheelSizeDAO;

    @Autowired
    public WheelOrderService(WheelOrderRepository wheelOrderDAO, PlayerRepository playerDAO, OrderRepository orderDAO,
            WheelModelRepository wheelModelDAO, WheelHardnessRepository wheelHardnessDAO,
            WheelSizeRepository wheelSizeDAO) {
        this.wheelOrderDAO = wheelOrderDAO;
        this.playerDAO = playerDAO;
        this.orderDAO = orderDAO;
        this.wheelModelDAO = wheelModelDAO;
        this.wheelHardnessDAO = wheelHardnessDAO;
        this.wheelSizeDAO = wheelSizeDAO;
    }

    public List<WheelOrder> getWheelOrders() {
        List<WheelOrder> wheelOrders = wheelOrderDAO.findAll();

        return wheelOrders;
    }

    public void createWheelOrder(long playerId, String phoneNumber, long orderId, long modelId,
            long hardnessId, long sizeId, int amount) {

        Player player = playerDAO.findById(playerId);
        Order order = orderDAO.findById(orderId);
        WheelModel model = wheelModelDAO.findById(modelId);
        WheelHardness hardness = wheelHardnessDAO.findById(hardnessId);
        WheelSize size = wheelSizeDAO.findById(sizeId);

        WheelOrder wheelOrder = new WheelOrder(player, phoneNumber, order, model, hardness, size, amount);

        wheelOrderDAO.save(wheelOrder);
    }
}
