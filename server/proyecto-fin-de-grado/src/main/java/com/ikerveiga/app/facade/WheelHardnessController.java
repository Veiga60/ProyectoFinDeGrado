package com.ikerveiga.app.facade;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ikerveiga.app.dto.WheelHardnessDTO;
import com.ikerveiga.app.entity.WheelHardness;
import com.ikerveiga.app.service.WheelHardnessService;

@RestController
public class WheelHardnessController {

    private WheelHardnessService wheelHardnessService;

    @Autowired
    public WheelHardnessController(WheelHardnessService wheelHardnessService) {
        this.wheelHardnessService = wheelHardnessService;
    }

    @GetMapping("/wheelHardnesses/all")
    public ResponseEntity<List<WheelHardnessDTO>> getWheelModels() {
        try {
            List<WheelHardnessDTO> wheelHardnessesDTO = new ArrayList<>();
            List<WheelHardness> wheelHardnesses = wheelHardnessService.getWheelHardnesses();

            for (WheelHardness wheelHardness : wheelHardnesses) {
                wheelHardnessesDTO.add(wheelHardness.toDTO());
            }

            return ResponseEntity.ok(wheelHardnessesDTO);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
