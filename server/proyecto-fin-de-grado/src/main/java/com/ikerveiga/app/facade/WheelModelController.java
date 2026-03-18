package com.ikerveiga.app.facade;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ikerveiga.app.dto.WheelModelDTO;
import com.ikerveiga.app.entity.WheelModel;
import com.ikerveiga.app.service.WheelModelService;

@RestController
public class WheelModelController {

    private WheelModelService wheelModelService;

    @Autowired
    public WheelModelController(WheelModelService wheelModelService) {
        this.wheelModelService = wheelModelService;
    }

    @GetMapping("/wheelModels/all")
    public ResponseEntity<List<WheelModelDTO>> getWheelModels() {
        try {
            List<WheelModelDTO> wheelModelsDTO = new ArrayList<>();
            List<WheelModel> wheelModels = wheelModelService.getWheelModels();

            for (WheelModel wheelModel : wheelModels) {
                wheelModelsDTO.add(wheelModel.toDTO());
            }

            return ResponseEntity.ok(wheelModelsDTO);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
