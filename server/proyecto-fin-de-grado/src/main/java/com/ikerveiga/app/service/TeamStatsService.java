package com.ikerveiga.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.dao.TeamStatsRepository;
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

    public void updatePlayersStats(int powerPlayGoals, int powerPlayNoGoals, int penaltyKillGoals,
            int penaltyKillNoGoals, int oneVsZero,
            int oneVsOne, int twoVsOne, int twoVsTwo, int threeVsOne, int threeVsTwo,
            int penaltyShotMisses) {
        TeamStats teamStats = teamStatsDAO.findById(1);

        if (teamStats == null) {
            throw new RuntimeException("Team stats not found");
        }

        // teamStats.setPoints(teamStats.getPoints() + );
        teamStats.setGamesPlayed(teamStats.getGamesPlayed() + 1);
        // teamStats.setGamesWon(teamStats.getGamesWon() + );
        // teamStats.setGamesLost(teamStats.getGamesTied() + );
        // teamStats.setBonusPoints(teamStats.getBonusPoints() + );
        // teamStats.setGoalsFor(teamStats.getGoalsFor() + );
        // teamStats.setGoalsAgainst(teamStats.getGoalsAgainst() + );
        teamStats.setPowerPlayPercentage(
                (teamStats.getPowerPlayPercentage() + ((powerPlayGoals / (powerPlayGoals + powerPlayNoGoals)) * 100))
                        / 2);
        teamStats.setPenaltyKillPercentage(
                (teamStats.getPowerPlayPercentage() + ((powerPlayGoals / (powerPlayGoals + powerPlayNoGoals)) * 100))
                        / 2);
        teamStats.setOneVsZero(teamStats.getOneVsZero() + oneVsZero);
        teamStats.setOneVsOne(teamStats.getOneVsOne() + oneVsOne);
        teamStats.setTwoVsOne(teamStats.getThreeVsOne() + twoVsOne);
        teamStats.setTwoVsTwo(teamStats.getTwoVsTwo() + twoVsTwo);
        teamStats.setThreeVsOne(teamStats.getThreeVsOne() + threeVsOne);
        teamStats.setThreeVsTwo(teamStats.getThreeVsTwo() + threeVsTwo);

        teamStatsDAO.save(teamStats);
    }
}
