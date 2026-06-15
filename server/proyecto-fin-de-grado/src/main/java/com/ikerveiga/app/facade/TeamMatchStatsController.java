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

import com.ikerveiga.app.dto.TeamMatchStatsDTO;
import com.ikerveiga.app.service.TeamMatchStatsService;

@RestController
public class TeamMatchStatsController {

    private TeamMatchStatsService teamMatchStatsService;

    @Autowired
    public TeamMatchStatsController(TeamMatchStatsService teamMatchStatsService) {
        this.teamMatchStatsService = teamMatchStatsService;
    }

    @Secured("ROLE_COACH")
    @PutMapping("/matchStats/matches/{matchId}/team")
    public ResponseEntity<Void> saveTeamMatchStats(@PathVariable("matchId") long matchId,
            @RequestBody TeamMatchStatsDTO teamMatchStatsDTO) {
        try {
            teamMatchStatsService.saveTeamMatchStats(teamMatchStatsDTO.getPowerPlayGoals(),
                    teamMatchStatsDTO.getPowerPlayNoGoals(), teamMatchStatsDTO.getPenaltyKillGoals(),
                    teamMatchStatsDTO.getPenaltyKillNoGoals(), teamMatchStatsDTO.getOneVsZero(),
                    teamMatchStatsDTO.getOneVsOne(), teamMatchStatsDTO.getTwoVsOne(),
                    teamMatchStatsDTO.getTwoVsTwo(), teamMatchStatsDTO.getThreeVsOne(),
                    teamMatchStatsDTO.getThreeVsTwo(),
                    matchId);

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("Match not found")) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }

    @GetMapping("/matchStats/matches/{matchId}/team")
    public ResponseEntity<TeamMatchStatsDTO> getTeamMatchStats(@PathVariable("matchId") long matchId) {
        try {
            TeamMatchStatsDTO teamMatchStats = teamMatchStatsService.getTeamMatchStats(matchId)
                    .toDTO();

            return ResponseEntity.ok(teamMatchStats);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
