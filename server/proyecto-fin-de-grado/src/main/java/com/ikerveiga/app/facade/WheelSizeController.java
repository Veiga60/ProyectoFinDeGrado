package com.ikerveiga.app.facade;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ikerveiga.app.dto.WheelSizeDTO;
import com.ikerveiga.app.entity.WheelSize;
import com.ikerveiga.app.service.WheelSizeService;

@RestController
public class WheelSizeController {

    private WheelSizeService wheelSizeService;

    @Autowired
    public WheelSizeController(WheelSizeService wheelSizeService) {
        this.wheelSizeService = wheelSizeService;
    }

    @GetMapping("/wheelSizes/all")
    public ResponseEntity<List<WheelSizeDTO>> getWheelModels() {
        try {
            List<WheelSizeDTO> wheelSizesDTO = new ArrayList<>();
            List<WheelSize> wheelSizes = wheelSizeService.getWheelSizes();

            for (WheelSize wheelSize : wheelSizes) {
                wheelSizesDTO.add(wheelSize.toDTO());
            }

            return ResponseEntity.ok(wheelSizesDTO);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
