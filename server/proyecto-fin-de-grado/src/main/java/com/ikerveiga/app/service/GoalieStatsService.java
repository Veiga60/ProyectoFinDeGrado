package com.ikerveiga.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.dao.GoalieStatsRepository;

@Service
public class GoalieStatsService {

    private GoalieStatsRepository goalieStatsDAO;

    @Autowired
    public GoalieStatsService(GoalieStatsRepository goalieStatsDAO) {
        this.goalieStatsDAO = goalieStatsDAO;
    }
}
