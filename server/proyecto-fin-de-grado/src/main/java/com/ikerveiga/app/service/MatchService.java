package com.ikerveiga.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.dao.MatchRepository;
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
}
