package com.ikerveiga.app.facade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ikerveiga.app.dto.ClubDTO;
import com.ikerveiga.app.service.ClubService;

@RestController
public class ClubController {

    ClubService clubService;

    @Autowired
    public ClubController(ClubService clubService) {
        this.clubService = clubService;
    }

    @GetMapping("/clubs/me")
    public ResponseEntity<ClubDTO> getCurrentClub() {
        try {
            ClubDTO club = clubService.getCurrentClub().toDTO();

            return ResponseEntity.ok(club);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("Ningún club asociado a ese código")
                    || e.getMessage().equals("Club no encontrado")) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }
}
