package com.ikerveiga.app.facade;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.ikerveiga.app.dto.MatchDTO;
import com.ikerveiga.app.entity.Match;
import com.ikerveiga.app.service.MatchService;

@RestController
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
                MatchDTO matchDTO = match.toDTOwithoutCalls();
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

    @GetMapping("matches/{id}")
    public ResponseEntity<MatchDTO> getMatch(@PathVariable("id") long id) {
        try {
            MatchDTO matchDTO = matchService.getMatch(id).toDTOwithoutCalls();
            return ResponseEntity.ok(matchDTO);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("Match not found")) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }

    @GetMapping("/matches/next")
    public ResponseEntity<List<MatchDTO>> getNextMatches() {
        try {
            List<Match> nextMatches = matchService.getNextMatches();
            List<MatchDTO> matchesDTO = new ArrayList<>();
            for (Match match : nextMatches) {
                MatchDTO matchDTO = match.toDTOwithoutCalls();
                matchesDTO.add(matchDTO);
            }

            return ResponseEntity.ok(matchesDTO);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("Next matches not found")) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }

}
