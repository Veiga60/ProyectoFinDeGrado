package com.ikerveiga.app.facade;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ikerveiga.app.dto.PlayerRecomendationDTO;
import com.ikerveiga.app.entity.PlayerRecomendation;
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

    @GetMapping("/recomendations/matches/{matchId}/players/{playerId}")
    public ResponseEntity<List<PlayerRecomendationDTO>> getPlayerRecomendations(@PathVariable("playerId") long playerId,
            @PathVariable("matchId") long matchId) {
        try {
            List<PlayerRecomendationDTO> playerRecomendationsDTO = new ArrayList<>();
            List<PlayerRecomendation> playerRecomendations = playerRecomendationService
                    .getPlayerRecomendations(playerId, matchId);

            for (PlayerRecomendation playerRecomendation : playerRecomendations) {
                playerRecomendationsDTO.add(playerRecomendation.toDTO());
            }

            return ResponseEntity.ok(playerRecomendationsDTO);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("Player not found") || e.getMessage().equals("Match not found")) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }
}
