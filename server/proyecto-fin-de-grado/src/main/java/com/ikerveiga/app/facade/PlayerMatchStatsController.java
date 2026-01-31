package com.ikerveiga.app.facade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ikerveiga.app.DTO.PlayerMatchStatsDTO;
import com.ikerveiga.app.service.PlayerMatchStatsService;

@RestController
public class PlayerMatchStatsController {

    private PlayerMatchStatsService playerMatchStatsService;

    @Autowired
    public PlayerMatchStatsController(PlayerMatchStatsService playerMatchStatsService) {
        this.playerMatchStatsService = playerMatchStatsService;
    }

    @Secured("ROLE_COACH")
    @PutMapping("/matchStats/matches/{matchId}/players/{playerId}")
    public ResponseEntity<Void> savePlayerMatchStats(@PathVariable("matchId") long matchId,
            @PathVariable("playerId") long playerId, @RequestBody PlayerMatchStatsDTO playerMatchStatsDTO) {
        try {
            playerMatchStatsService.savePlayerMatchStats(playerMatchStatsDTO.getGoals(),
                    playerMatchStatsDTO.getAssists(), playerMatchStatsDTO.getPlusMinus(),
                    playerMatchStatsDTO.getShots(), playerMatchStatsDTO.getGoodPasses(),
                    playerMatchStatsDTO.getBadPasses(), playerMatchStatsDTO.getRecoveredPucks(),
                    playerMatchStatsDTO.getLostPucks(), playerMatchStatsDTO.getPenaltyMins(),
                    playerMatchStatsDTO.getPenaltyShotGoals(), playerMatchStatsDTO.getPenaltyShotMisses(), playerId,
                    matchId);

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("Player not found") || e.getMessage().equals("Match not found")) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }

    @GetMapping("/matchStats/matches/{matchId}/players/{playerId}")
    public ResponseEntity<PlayerMatchStatsDTO> getPlayerMatchStats(@PathVariable("matchId") long matchId,
            @PathVariable("playerId") long playerId) {
        try {
            PlayerMatchStatsDTO playerMatchStats = playerMatchStatsService.getPlayerMatchStats(playerId, matchId)
                    .toDTO();

            return ResponseEntity.ok(playerMatchStats);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
