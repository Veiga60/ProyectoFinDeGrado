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

import com.ikerveiga.app.dto.GoalieStatsDTO;
import com.ikerveiga.app.service.GoalieStatsService;

@RestController
public class GoalieStatsController {

    private GoalieStatsService goalieStatsService;

    @Autowired
    public GoalieStatsController(GoalieStatsService goalieStatsService) {
        this.goalieStatsService = goalieStatsService;
    }

    @GetMapping("/stats/goalies/{playerId}/clubTeams/{clubTeamId}")
    public ResponseEntity<GoalieStatsDTO> getGoalieStatsofPlayerOfClubTeam(@PathVariable("playerId") long playerId,
            @PathVariable("clubTeamId") long clubTeamId) {
        try {

            GoalieStatsDTO goalieStats = goalieStatsService.getGoalieStatsofPlayerOfClubTeam(playerId, clubTeamId)
                    .toDTO();
            return ResponseEntity.ok(goalieStats);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("No se ha encontrado al jugador")) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }

    }

    @Secured("ROLE_COACH")
    @PutMapping("/goaliesStats/all/update")
    public ResponseEntity<Void> updateGoaliesStats(@RequestBody List<GoalieStatsDTO> goaliesStats) {
        try {
            for (GoalieStatsDTO goalieStats : goaliesStats) {
                goalieStatsService.updateGoaliesStats(goalieStats.getGoalie().getId(), goalieStats.getGoalsReceived(),
                        goalieStats.getShotsReceived(), goalieStats.getPenaltyMins(), goalieStats.getPenaltyShotGoals(),
                        goalieStats.getPenaltyShotSaves());
            }

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("Goalie stats not found")) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }
}
