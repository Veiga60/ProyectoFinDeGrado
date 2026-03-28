package com.ikerveiga.app.facade;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ikerveiga.app.dto.StickLengthDTO;
import com.ikerveiga.app.entity.StickLength;
import com.ikerveiga.app.service.StickLengthService;

@RestController
public class StickLengthController {

    private StickLengthService stickLengthService;

    @Autowired
    public StickLengthController(StickLengthService stickLengthService) {
        this.stickLengthService = stickLengthService;
    }

    @GetMapping("stickLengths/all")
    public ResponseEntity<List<StickLengthDTO>> getLengths() {
        try {
            List<StickLengthDTO> lengthsDTO = new ArrayList<>();
            List<StickLength> lengths = stickLengthService.getLengths();

            for (StickLength length : lengths) {
                lengthsDTO.add(length.toDTO());
            }

            return ResponseEntity.ok(lengthsDTO);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("No lengths found")) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }
}
