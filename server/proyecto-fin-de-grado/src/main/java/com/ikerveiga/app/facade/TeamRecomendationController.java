package com.ikerveiga.app.facade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ikerveiga.app.dto.TeamRecomendationDTO;
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
}
