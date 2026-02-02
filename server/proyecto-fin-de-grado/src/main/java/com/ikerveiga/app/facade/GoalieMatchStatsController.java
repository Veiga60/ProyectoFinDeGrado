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

import com.ikerveiga.app.dto.GoalieMatchStatsDTO;
import com.ikerveiga.app.service.GoalieMatchStatsService;

@RestController
public class GoalieMatchStatsController {

    private GoalieMatchStatsService goalieMatchStatsService;

    @Autowired
    public GoalieMatchStatsController(GoalieMatchStatsService goalieMatchStatsService) {
        this.goalieMatchStatsService = goalieMatchStatsService;
    }

    @Secured("ROLE_COACH")
    @PutMapping("/matchStats/matches/{matchId}/goalies/{playerId}")
    public ResponseEntity<Void> saveGoalieMatchStats(@PathVariable("matchId") long matchId,
            @PathVariable("playerId") long playerId, @RequestBody GoalieMatchStatsDTO goalieMatchStatsDTO) {
        try {
            goalieMatchStatsService.saveGoalieMatchStats(goalieMatchStatsDTO.getShotsReceived(),
                    goalieMatchStatsDTO.getGoalsReceived(), goalieMatchStatsDTO.getPenaltyMins(),
                    goalieMatchStatsDTO.getPenaltyShotGoals(), goalieMatchStatsDTO.getPenaltyShotSaves(), playerId,
                    matchId);

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("Goalie not found") || e.getMessage().equals("Match not found")) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }

    @GetMapping("/matchStats/matches/{matchId}/goalies/{playerId}")
    public ResponseEntity<GoalieMatchStatsDTO> getGoalieMatchStats(@PathVariable("matchId") long matchId,
            @PathVariable("playerId") long playerId) {
        try {
            GoalieMatchStatsDTO goalieMatchStats = goalieMatchStatsService.getGoalieMatchStats(playerId, matchId)
                    .toDTO();

            return ResponseEntity.ok(goalieMatchStats);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
