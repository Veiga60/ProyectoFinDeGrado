package com.ikerveiga.app.facade;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ikerveiga.app.dto.StickGripDTO;
import com.ikerveiga.app.entity.StickGrip;
import com.ikerveiga.app.service.StickGripService;

@RestController
public class StickGripController {

    private StickGripService stickGripService;

    @Autowired
    public StickGripController(StickGripService stickGripService) {
        this.stickGripService = stickGripService;
    }

    @GetMapping("stickGrips/all")
    public ResponseEntity<List<StickGripDTO>> getGrips() {
        try {
            List<StickGripDTO> gripsDTO = new ArrayList<>();
            List<StickGrip> grips = stickGripService.getGrips();

            for (StickGrip grip : grips) {
                gripsDTO.add(grip.toDTO());
            }

            return ResponseEntity.ok(gripsDTO);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("No grips found")) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }
}
