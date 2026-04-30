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

import com.ikerveiga.app.dto.TeamRecomendationDTO;
import com.ikerveiga.app.entity.TeamRecomendation;
import com.ikerveiga.app.service.TeamRecomendationService;

@RestController
public class TeamRecomendationController {

    TeamRecomendationService teamRecomendationService;

    @Autowired
    public TeamRecomendationController(TeamRecomendationService teamRecomendationService) {
        this.teamRecomendationService = teamRecomendationService;
    }

    @PostMapping("/ai/recomendations/team")
    public ResponseEntity<Void> createTeamRecomendation(@RequestBody TeamRecomendationDTO teamRecomendationDTO) {
        try {
            teamRecomendationService.createTeamRecomendation(teamRecomendationDTO.getArea(),
                    teamRecomendationDTO.getDescription(), teamRecomendationDTO.getMatch().getId());
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("Match not found")) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }

    @GetMapping("/recomendations/matches/{matchId}/team")
    public ResponseEntity<List<TeamRecomendationDTO>> getTeamRecomendations(@PathVariable("matchId") long matchId) {
        try {
            List<TeamRecomendationDTO> teamRecomendationsDTO = new ArrayList<>();
            List<TeamRecomendation> teamRecomendations = teamRecomendationService
                    .getTeamRecomendations(matchId);

            for (TeamRecomendation teamRecomendation : teamRecomendations) {
                teamRecomendationsDTO.add(teamRecomendation.toDTO());
            }

            return ResponseEntity.ok(teamRecomendationsDTO);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("Match not found")) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }
}
