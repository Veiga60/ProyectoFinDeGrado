package com.ikerveiga.app.facade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ikerveiga.app.DTO.TeamStatsDTO;
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
}
