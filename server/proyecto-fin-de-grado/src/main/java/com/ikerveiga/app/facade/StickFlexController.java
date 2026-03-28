package com.ikerveiga.app.facade;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ikerveiga.app.dto.StickFlexDTO;
import com.ikerveiga.app.entity.StickFlex;
import com.ikerveiga.app.service.StickFlexService;

@RestController
public class StickFlexController {

    private StickFlexService stickFlexService;

    @Autowired
    public StickFlexController(StickFlexService stickFlexService) {
        this.stickFlexService = stickFlexService;
    }

    @GetMapping("stickFlexes/all")
    public ResponseEntity<List<StickFlexDTO>> getFlexes() {
        try {
            List<StickFlexDTO> flexesDTO = new ArrayList<>();
            List<StickFlex> flexes = stickFlexService.getFlexes();

            for (StickFlex flex : flexes) {
                flexesDTO.add(flex.toDTO());
            }

            return ResponseEntity.ok(flexesDTO);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("No flexes found")) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }
}
