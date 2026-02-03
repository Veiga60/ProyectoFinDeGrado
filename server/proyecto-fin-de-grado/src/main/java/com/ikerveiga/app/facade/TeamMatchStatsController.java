package com.ikerveiga.app.facade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.ikerveiga.app.service.TeamMatchStatsService;

@RestController
public class TeamMatchStatsController {

    private TeamMatchStatsService teamMatchStatsService;

    @Autowired
    public TeamMatchStatsController(TeamMatchStatsService teamMatchStatsService) {
        this.teamMatchStatsService = teamMatchStatsService;
    }
}
