package com.ikerveiga.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.dao.TeamMatchStatsRepository;

@Service
public class TeamMatchStatsService {

    private TeamMatchStatsRepository teamMatchStatsDAO;

    @Autowired
    public TeamMatchStatsService(TeamMatchStatsRepository teamMatchStatsDAO) {
        this.teamMatchStatsDAO = teamMatchStatsDAO;
    }
}
