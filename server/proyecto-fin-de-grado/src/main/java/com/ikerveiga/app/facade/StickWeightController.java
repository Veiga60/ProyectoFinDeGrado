package com.ikerveiga.app.facade;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ikerveiga.app.dto.StickWeightDTO;
import com.ikerveiga.app.entity.StickWeight;
import com.ikerveiga.app.service.StickWeightService;

@RestController
public class StickWeightController {

    private StickWeightService stickWeightService;

    @Autowired
    public StickWeightController(StickWeightService stickWeightService) {
        this.stickWeightService = stickWeightService;
    }

    @GetMapping("stickWeights/all")
    public ResponseEntity<List<StickWeightDTO>> getWeights() {
        try {
            List<StickWeightDTO> weightsDTO = new ArrayList<>();
            List<StickWeight> weights = stickWeightService.getWeights();

            for (StickWeight weight : weights) {
                weightsDTO.add(weight.toDTO());
            }

            return ResponseEntity.ok(weightsDTO);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("No weights found")) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }
}
