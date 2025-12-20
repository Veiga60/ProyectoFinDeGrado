package com.ikerveiga.app.facade;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.ikerveiga.app.DTO.MatchDTO;
import com.ikerveiga.app.entity.Match;
import com.ikerveiga.app.service.MatchService;

@Controller
public class MatchController {

    MatchService matchService;

    @Autowired
    public MatchController(MatchService matchService) {
        this.matchService = matchService;
    }

    @GetMapping("/matches")
    public ResponseEntity<List<MatchDTO>> getMatches() {
        List<Match> matches = new ArrayList<>();
        List<MatchDTO> matchesDTO = new ArrayList<>();
        try {
            matches = matchService.getMatches();
            for (Match match : matches) {
                MatchDTO matchDTO = new MatchDTO(match.getId(), match.getLocalTeam(), match.getVisitingTeam(),
                        match.getDate(),
                        match.getTime(), match.getIsPlayed());
                matchesDTO.add(matchDTO);
            }

            return ResponseEntity.ok(matchesDTO);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("No se han encontrado partidos")) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                e.printStackTrace();
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }

}
