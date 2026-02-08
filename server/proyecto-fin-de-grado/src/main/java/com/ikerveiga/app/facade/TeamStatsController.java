package com.ikerveiga.app.facade;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ikerveiga.app.dto.PlayerStatsDTO;
import com.ikerveiga.app.dto.TeamStatsDTO;
import com.ikerveiga.app.service.TeamStatsService;

@RestController
public class TeamStatsController {

    TeamStatsService teamStatsService;

    @Autowired
    public TeamStatsController(TeamStatsService teamStatsService) {
        this.teamStatsService = teamStatsService;
    }

    @GetMapping("/team/stats")
    public ResponseEntity<TeamStatsDTO> getTeamStats() {
        try {
            TeamStatsDTO teamStatsDTO = teamStatsService.getTeamStats().toDTO();
            return ResponseEntity.ok(teamStatsDTO);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("No se han encontrado estadísticas")) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }

    // @Secured("ROLE_COACH")
    // @PutMapping("/playersStats/all/update")
    // public ResponseEntity<Void> updateTeamStats(@RequestBody TeamStatsDTO
    // teamStats) {
    // try {
    // for (PlayerStatsDTO playerStats : playersStats) {
    // playerStatsService.updatePlayersStats(playerStats.getPlayer().getId(),
    // playerStats.getGoals(),
    // playerStats.getAssists(), playerStats.getPlusMinus(), playerStats.getShots(),
    // playerStats.getGoodPasses(), playerStats.getBadPasses(),
    // playerStats.getRecoveredPucks(),
    // playerStats.getLostPucks(), playerStats.getPenaltyMins(),
    // playerStats.getPenaltyShotGoals(),
    // playerStats.getPenaltyShotMisses());
    // }

    // return new ResponseEntity<>(HttpStatus.OK);
    // } catch (RuntimeException e) {
    // if (e.getMessage().equals("Player stats not found")) {
    // return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    // } else {
    // return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    // }
    // }
    // }
}
