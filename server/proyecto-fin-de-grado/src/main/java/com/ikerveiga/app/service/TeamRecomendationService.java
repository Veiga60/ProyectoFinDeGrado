package com.ikerveiga.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.dao.MatchRepository;
import com.ikerveiga.app.dao.TeamRecomendationRepository;
import com.ikerveiga.app.entity.Match;
import com.ikerveiga.app.entity.TeamRecomendation;

@Service
public class TeamRecomendationService {

    TeamRecomendationRepository teamRecomendationDAO;
    MatchRepository matchDAO;

    @Autowired
    public TeamRecomendationService(TeamRecomendationRepository teamRecomendationDAO, MatchRepository matchDAO) {
        this.teamRecomendationDAO = teamRecomendationDAO;
        this.matchDAO = matchDAO;
    }

    public void createTeamRecomendation(String area, String description, long matchId) {
        Match match = matchDAO.findById(matchId);

        if (match == null) {
            throw new RuntimeException("Match not found");
        }

        TeamRecomendation teamRecomendation = new TeamRecomendation(area, description, match);

        teamRecomendationDAO.save(teamRecomendation);
    }

    public List<TeamRecomendation> getTeamRecomendations(long matchId) {
        Match match = matchDAO.findById(matchId);

        if (match == null) {
            throw new RuntimeException("Match not found");
        }

        List<TeamRecomendation> teamRecomendation = teamRecomendationDAO.findByMatch(match);

        return teamRecomendation;
    }
}
