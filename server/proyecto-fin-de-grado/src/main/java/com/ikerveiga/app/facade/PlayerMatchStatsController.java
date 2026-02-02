package com.ikerveiga.app.facade;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ikerveiga.app.dto.PlayerMatchStatsDTO;
import com.ikerveiga.app.entity.PlayerMatchStats;
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

    @GetMapping("/playersMatchStats/matches/{matchId}")
    public ResponseEntity<List<PlayerMatchStatsDTO>> getPlayersMatchStats(@PathVariable("matchId") long matchId) {
        try {
            List<PlayerMatchStatsDTO> playersMatchStatsDTO = new ArrayList<>();
            List<PlayerMatchStats> playersMatchStats = playerMatchStatsService.getPlayersMatchStats(matchId);

            for (PlayerMatchStats playerMatchStats : playersMatchStats) {
                playersMatchStatsDTO.add(playerMatchStats.toDTO());
            }

            return ResponseEntity.ok(playersMatchStatsDTO);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("There are no stats for the match")) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }
}
