package com.ikerveiga.app.facade;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ikerveiga.app.dto.ClubTeamDTO;
import com.ikerveiga.app.entity.ClubTeam;
import com.ikerveiga.app.service.ClubTeamService;

@RestController
public class ClubTeamController {

    private ClubTeamService clubTeamService;

    @Autowired
    public ClubTeamController(ClubTeamService clubTeamService) {
        this.clubTeamService = clubTeamService;
    }

    @GetMapping("/clubTeams/all")
    public ResponseEntity<List<ClubTeamDTO>> getAllClubTeams() {
        List<ClubTeamDTO> clubTeamsDTO = new ArrayList<>();

        try {
            List<ClubTeam> clubTeams = clubTeamService.getAllClubTeams();
            for (ClubTeam clubTeam : clubTeams) {
                clubTeamsDTO.add(clubTeam.toDTO());
            }

            return ResponseEntity.ok(clubTeamsDTO);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("No se han encontrado categorías")) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }
}