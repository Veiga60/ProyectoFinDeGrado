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

    public List<Match> getMatches(Long clubTeamId) {
        List<Match> matches = matchDAO.findByClubTeamId(clubTeamId);

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

    public void updateMatch(long matchId, int localTeamGoals, int visitingTeamGoals, Long bonusPoint) {
        Match match = matchDAO.findById(matchId);

        if (match == null) {
            throw new RuntimeException("No se ha encontrado el partido a actualizar");
        }

        match.setLocalTeamGoals(localTeamGoals);
        match.setVisitingTeamGoals(visitingTeamGoals);
        match.setBonusPoint(bonusPoint);
        match.setIsPlayed(true);

        matchDAO.save(match);
    }

    public Match getLastPlayedMatch() {
        List<Match> playedMatches = matchDAO.findPlayedMatchesBackwards();

        if (playedMatches.isEmpty()) {
            throw new RuntimeException("No matches played");
        }

        Match lastPlayedMatch = playedMatches.get(0);

        return lastPlayedMatch;
    }

    public Match getLastPlayedMatchWithRecomendations() {
        List<Match> playedMatches = matchDAO.findPlayedMatchesWithRecomendationsBackwards();

        if (playedMatches.isEmpty()) {
            throw new RuntimeException("No matches played with recommendations");
        }

        Match lastPlayedMatch = playedMatches.get(0);

        return lastPlayedMatch;
    }
}
