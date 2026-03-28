package com.ikerveiga.app.facade;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ikerveiga.app.dto.StickOrderDTO;
import com.ikerveiga.app.entity.StickOrder;
import com.ikerveiga.app.service.StickOrderService;

@RestController
public class StickOrderController {

    private StickOrderService stickOrderService;

    @Autowired
    public StickOrderController(StickOrderService stickOrderService) {
        this.stickOrderService = stickOrderService;
    }

    @GetMapping("orders/sticks/all")
    public ResponseEntity<List<StickOrderDTO>> getOrders() {
        try {
            List<StickOrderDTO> ordersDTO = new ArrayList<>();
            List<StickOrder> orders = stickOrderService.getOrders();

            for (StickOrder order : orders) {
                ordersDTO.add(order.toDTO());
            }

            return ResponseEntity.ok(ordersDTO);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("No orders found")) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }

    @PostMapping("/orders/sticks")
    public ResponseEntity<Void> createStickOrder(@RequestBody StickOrderDTO stickOrder) {
        try {
            stickOrderService.createStickOrder(stickOrder.getPlayer().getId(), stickOrder.getPhoneNumber(),
                    stickOrder.getOrder().getId(), stickOrder.getModel().getId(), stickOrder.getLength().getId(),
                    stickOrder.getWeight().getId(), stickOrder.getSide(), stickOrder.getBlade().getId(),
                    stickOrder.getFlex().getId(), stickOrder.getKickpoint().getId(), stickOrder.getGrip().getId(),
                    stickOrder.getAmount(), stickOrder.getNametag());

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
