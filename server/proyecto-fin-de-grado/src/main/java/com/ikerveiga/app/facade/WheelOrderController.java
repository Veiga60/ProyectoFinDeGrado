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

import com.ikerveiga.app.dto.WheelOrderDTO;
import com.ikerveiga.app.entity.WheelOrder;
import com.ikerveiga.app.service.WheelOrderService;

@RestController
public class WheelOrderController {

    private WheelOrderService wheelOrderService;

    @Autowired
    public WheelOrderController(WheelOrderService wheelOrderService) {
        this.wheelOrderService = wheelOrderService;
    }

    @GetMapping("/orders/wheels/alls")
    public ResponseEntity<List<WheelOrderDTO>> getWheelOrders() {
        try {
            List<WheelOrderDTO> wheelOrdersDTO = new ArrayList<>();
            List<WheelOrder> wheelOrders = wheelOrderService.getWheelOrders();
            for (WheelOrder wheelOrder : wheelOrders) {
                wheelOrdersDTO.add(wheelOrder.toDTO());
            }

            return ResponseEntity.ok(wheelOrdersDTO);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/orders/wheels")
    public ResponseEntity<Void> createWheelOrder(@RequestBody WheelOrderDTO wheelOrder) {
        try {
            wheelOrderService.createWheelOrder(wheelOrder.getPlayer().getId(), wheelOrder.getPhoneNumber(),
                    wheelOrder.getOrder().getId(), wheelOrder.getModel().getId(), wheelOrder.getHardness().getId(),
                    wheelOrder.getSize().getId(), wheelOrder.getAmount());

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
