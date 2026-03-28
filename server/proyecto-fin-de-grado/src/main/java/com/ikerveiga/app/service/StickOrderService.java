package com.ikerveiga.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.dao.OrderRepository;
import com.ikerveiga.app.dao.PlayerRepository;
import com.ikerveiga.app.dao.StickBladeRepository;
import com.ikerveiga.app.dao.StickFlexRepository;
import com.ikerveiga.app.dao.StickGripRepository;
import com.ikerveiga.app.dao.StickKickpointRepository;
import com.ikerveiga.app.dao.StickLengthRepository;
import com.ikerveiga.app.dao.StickModelRepository;
import com.ikerveiga.app.dao.StickOrderRepository;
import com.ikerveiga.app.dao.StickWeightRepository;
import com.ikerveiga.app.entity.Order;
import com.ikerveiga.app.entity.Player;
import com.ikerveiga.app.entity.StickBlade;
import com.ikerveiga.app.entity.StickFlex;
import com.ikerveiga.app.entity.StickGrip;
import com.ikerveiga.app.entity.StickKickpoint;
import com.ikerveiga.app.entity.StickLength;
import com.ikerveiga.app.entity.StickModel;
import com.ikerveiga.app.entity.StickOrder;
import com.ikerveiga.app.entity.StickWeight;

@Service
public class StickOrderService {

    private StickOrderRepository stickOrderDAO;
    private PlayerRepository playerDAO;
    private OrderRepository orderDAO;
    private StickModelRepository stickModelDAO;
    private StickLengthRepository stickLengthDAO;
    private StickWeightRepository stickWeightDAO;
    private StickBladeRepository stickBladeDAO;
    private StickFlexRepository stickFlexDAO;
    private StickKickpointRepository stickKickpointDAO;
    private StickGripRepository stickGripDAO;

    @Autowired
    public StickOrderService(StickOrderRepository stickOrderDAO, PlayerRepository playerDAO, OrderRepository orderDAO,
            StickModelRepository stickModelDAO, StickLengthRepository stickLengthDAO,
            StickWeightRepository stickWeightDAO, StickBladeRepository stickBladeDAO, StickFlexRepository stickFlexDAO,
            StickKickpointRepository stickKickpointDAO, StickGripRepository stickGripDAO) {
        this.stickOrderDAO = stickOrderDAO;
        this.playerDAO = playerDAO;
        this.orderDAO = orderDAO;
        this.stickModelDAO = stickModelDAO;
        this.stickLengthDAO = stickLengthDAO;
        this.stickWeightDAO = stickWeightDAO;
        this.stickBladeDAO = stickBladeDAO;
        this.stickFlexDAO = stickFlexDAO;
        this.stickKickpointDAO = stickKickpointDAO;
        this.stickGripDAO = stickGripDAO;
    }

    public List<StickOrder> getOrders() {
        List<StickOrder> orders = stickOrderDAO.findAll();

        return orders;
    }

    public void createStickOrder(long playerId, String phoneNumber, long orderId, long modelId,
            long lengthId, long weightId, String side, long bladeId, long flexId, long kickpointId, long gripId,
            int amount, String nametag) {

        Player player = playerDAO.findById(playerId);
        Order order = orderDAO.findById(orderId);
        StickModel model = stickModelDAO.findById(modelId);
        StickLength length = stickLengthDAO.findById(lengthId);
        StickWeight weight = stickWeightDAO.findById(weightId);
        StickBlade blade = stickBladeDAO.findById(bladeId);
        StickFlex flex = stickFlexDAO.findById(flexId);
        StickKickpoint kickpoint = stickKickpointDAO.findById(kickpointId);
        StickGrip grip = stickGripDAO.findById(gripId);

        StickOrder stickOrder = new StickOrder(player, phoneNumber, order, model, length, weight, side, blade, flex,
                kickpoint, grip, amount, nametag);

        stickOrderDAO.save(stickOrder);
    }
}
