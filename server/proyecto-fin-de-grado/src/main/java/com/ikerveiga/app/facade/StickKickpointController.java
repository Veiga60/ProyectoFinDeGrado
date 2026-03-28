package com.ikerveiga.app.facade;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ikerveiga.app.dto.StickKickpointDTO;
import com.ikerveiga.app.entity.StickKickpoint;
import com.ikerveiga.app.service.StickKickpointService;

@RestController
public class StickKickpointController {

    private StickKickpointService stickKickpointService;

    @Autowired
    public StickKickpointController(StickKickpointService stickKickpointService) {
        this.stickKickpointService = stickKickpointService;
    }

    @GetMapping("stickKickpoints/all")
    public ResponseEntity<List<StickKickpointDTO>> getKickpoints() {
        try {
            List<StickKickpointDTO> kickpointsDTO = new ArrayList<>();
            List<StickKickpoint> kickpoints = stickKickpointService.getKickpoints();

            for (StickKickpoint kickpoint : kickpoints) {
                kickpointsDTO.add(kickpoint.toDTO());
            }

            return ResponseEntity.ok(kickpointsDTO);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("No kickpoints found")) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }
}
