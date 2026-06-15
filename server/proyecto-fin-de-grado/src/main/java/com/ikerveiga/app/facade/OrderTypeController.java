package com.ikerveiga.app.facade;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ikerveiga.app.dto.OrderTypeDTO;
import com.ikerveiga.app.entity.OrderType;
import com.ikerveiga.app.service.OrderTypeService;

@RestController
public class OrderTypeController {

    OrderTypeService orderTypeService;

    @Autowired
    public OrderTypeController(OrderTypeService orderTypeService) {
        this.orderTypeService = orderTypeService;
    }

    @GetMapping("/orders/types/all")
    public ResponseEntity<List<OrderTypeDTO>> getOrderTypes() {
        try {
            List<OrderTypeDTO> orderTypesDTO = new ArrayList<>();
            List<OrderType> orderTypes = orderTypeService.getOrderTypes();

            for (OrderType orderType : orderTypes) {
                orderTypesDTO.add(orderType.toDTO());
            }

            return ResponseEntity.ok(orderTypesDTO);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("No order types found")) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }
}
