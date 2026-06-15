package com.ikerveiga.app.facade;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ikerveiga.app.dto.StickBladeDTO;
import com.ikerveiga.app.entity.StickBlade;
import com.ikerveiga.app.service.StickBladeService;

@RestController
public class StickBladeController {

    private StickBladeService stickBladeService;

    @Autowired
    public StickBladeController(StickBladeService stickBladeService) {
        this.stickBladeService = stickBladeService;
    }

    @GetMapping("stickBlades/all")
    public ResponseEntity<List<StickBladeDTO>> getBlades() {
        try {
            List<StickBladeDTO> bladesDTO = new ArrayList<>();
            List<StickBlade> blades = stickBladeService.getBlades();

            for (StickBlade blade : blades) {
                bladesDTO.add(blade.toDTO());
            }

            return ResponseEntity.ok(bladesDTO);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("No blades found")) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }
}
