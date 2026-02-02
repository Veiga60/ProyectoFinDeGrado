package com.ikerveiga.app.facade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.ikerveiga.app.service.GoalieStatsService;

@RestController
public class GoalieStatsController {

    private GoalieStatsService goalieStatsService;

    @Autowired
    public GoalieStatsController(GoalieStatsService goalieStatsService) {
        this.goalieStatsService = goalieStatsService;
    }
}
