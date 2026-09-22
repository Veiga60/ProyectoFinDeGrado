package com.ikerveiga.app.facade;

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

import com.ikerveiga.app.dto.PlayerStatsDTO;

import com.ikerveiga.app.service.PlayerStatsService;

@RestController
public class PlayerStatsController {

    private PlayerStatsService playerStatsService;

    @Autowired
    public PlayerStatsController(PlayerStatsService playerStatsService) {
        this.playerStatsService = playerStatsService;
    }

    @GetMapping("/stats/players/{playerId}/clubTeams/{clubTeamId}")
    public ResponseEntity<PlayerStatsDTO> getPlayerStatsofPlayerOfClubTeam(@PathVariable("playerId") long playerId,
            @PathVariable("clubTeamId") long clubTeamId) {
        try {

            PlayerStatsDTO playerStats = playerStatsService.getPlayerStatsofPlayerOfClubTeam(playerId, clubTeamId)
                    .toDTO();
            return ResponseEntity.ok(playerStats);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("No se ha encontrado al jugador")) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }

    @Secured("ROLE_COACH")
    @PutMapping("/playersStats/clubTeams/{clubTeamId}/all/update")
    public ResponseEntity<Void> updatePlayersStats(@RequestBody List<PlayerStatsDTO> playersStats,
            @PathVariable("clubTeamId") long clubTeamId) {
        try {
            for (PlayerStatsDTO playerStats : playersStats) {
                playerStatsService.updatePlayersStats(playerStats.getPlayer().getId(),
                        clubTeamId,
                        playerStats.getGoals(), playerStats.getAssists(), playerStats.getPlusMinus(),
                        playerStats.getShots(),
                        playerStats.getGoodPasses(), playerStats.getBadPasses(), playerStats.getRecoveredPucks(),
                        playerStats.getLostPucks(), playerStats.getPenaltyMins(), playerStats.getPenaltyShotGoals(),
                        playerStats.getPenaltyShotMisses());
            }

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            e.printStackTrace();
            if ("Player stats not found".equals(e.getMessage())) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }
}
