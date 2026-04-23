package com.ikerveiga.app.facade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ikerveiga.app.dto.PlayerRecomendationDTO;
import com.ikerveiga.app.service.PlayerRecomendationService;

@RestController
public class PlayerRecomendationController {

    PlayerRecomendationService playerRecomendationService;

    @Autowired
    public PlayerRecomendationController(PlayerRecomendationService playerRecomendationService) {
        this.playerRecomendationService = playerRecomendationService;
    }

    @PostMapping("/ai/recomendations/player")
    public ResponseEntity<Void> createTeamRecomendation(@RequestBody PlayerRecomendationDTO playerRecomendationDTO) {
        try {
            playerRecomendationService.createPlayerRecomendation(playerRecomendationDTO.getArea(),
                    playerRecomendationDTO.getDescription(), playerRecomendationDTO.getPlayer().getId(),
                    playerRecomendationDTO.getMatch().getId());
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("Match not found")) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else if (e.getMessage().equals("Player not found")) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }
}
