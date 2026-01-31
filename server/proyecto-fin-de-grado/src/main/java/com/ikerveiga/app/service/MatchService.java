package com.ikerveiga.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.DAO.MatchRepository;
import com.ikerveiga.app.entity.Match;

@Service
public class MatchService {

    MatchRepository matchDAO;

    @Autowired
    public MatchService(MatchRepository matchDAO) {
        this.matchDAO = matchDAO;
    }

    public List<Match> getMatches() {
        List<Match> matches = matchDAO.findAll();

        if (matches.isEmpty()) {
            throw new RuntimeException("No se han encontrado partidos");
        }

        return matches;
    }

    public Match getMatch(long id) {
        Match match = matchDAO.findById(id);

        if (match == null) {
            throw new RuntimeException("Match not found");
        }

        return match;
    }

    public List<Match> getNextMatches() {
        List<Match> nextMatches = matchDAO.findNextMatches();

        if (nextMatches.isEmpty()) {
            throw new RuntimeException("Next matches not found");
        }

        return nextMatches;
    }
}
