package com.ikerveiga.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.DAO.TeamStatsRepository;
import com.ikerveiga.app.entity.TeamStats;

@Service
public class TeamStatsService {

    TeamStatsRepository teamStatsDAO;

    @Autowired
    public TeamStatsService(TeamStatsRepository teamStatsDAO) {
        this.teamStatsDAO = teamStatsDAO;
    }

    public TeamStats getTeamStats() {
        List<TeamStats> teamStats = teamStatsDAO.findAll();

        if (teamStats.isEmpty()) {
            throw new RuntimeException("No se han encontrado estadísticas");
        }
        System.out.println(teamStats.toString());
        return teamStats.get(0);
    }
}
