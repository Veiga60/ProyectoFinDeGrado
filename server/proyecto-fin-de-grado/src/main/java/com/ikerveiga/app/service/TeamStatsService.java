package com.ikerveiga.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.dao.TeamStatsRepository;
import com.ikerveiga.app.entity.TeamStats;
import com.ikerveiga.app.enums.MatchResult;

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
        return teamStats.get(0);
    }

    public void updateTeamStats(MatchResult matchResult, boolean bonusPoint, int goalsFor, int goalsAgainst,
            int powerPlayGoals,
            int powerPlayNoGoals,
            int penaltyKillGoals,
            int penaltyKillNoGoals, int oneVsZero,
            int oneVsOne, int twoVsOne, int twoVsTwo, int threeVsOne, int threeVsTwo) {
        TeamStats teamStats = teamStatsDAO.findById(1);

        if (teamStats == null) {
            throw new RuntimeException("Team stats not found");
        }

        teamStats.setGamesPlayed(teamStats.getGamesPlayed() + 1);
        switch (matchResult) {
            case MatchResult.WIN:
                teamStats.setGamesWon(teamStats.getGamesWon() + 1);
                teamStats.setPoints(teamStats.getPoints() + 3);
                break;
            case MatchResult.LOSS:
                teamStats.setGamesLost(teamStats.getGamesLost() + 1);
                break;
            case MatchResult.TIE:
                teamStats.setGamesTied(teamStats.getGamesTied() + 1);
                if (bonusPoint) {
                    teamStats.setPoints(teamStats.getPoints() + 2);
                    teamStats.setBonusPoints(teamStats.getBonusPoints() + 1);
                } else {
                    teamStats.setPoints(teamStats.getPoints() + 1);
                }
                break;
            default:
                break;

        }
        teamStats.setGoalsFor(teamStats.getGoalsFor() + goalsFor);
        teamStats.setGoalsAgainst(teamStats.getGoalsAgainst() + goalsAgainst);
        if ((powerPlayGoals + powerPlayNoGoals) != 0) {
            teamStats.setPowerPlayPercentage(
                    (teamStats.getPowerPlayPercentage()
                            + ((powerPlayGoals / (powerPlayGoals + powerPlayNoGoals)) * 100))
                            / 2);
        }
        if ((penaltyKillGoals + penaltyKillNoGoals) != 0) {
            teamStats.setPenaltyKillPercentage(
                    (teamStats.getPenaltyKillPercentage()
                            + ((penaltyKillGoals / (penaltyKillGoals + penaltyKillNoGoals)) * 100))
                            / 2);
        }
        teamStats.setOneVsZero(teamStats.getOneVsZero() + oneVsZero);
        teamStats.setOneVsOne(teamStats.getOneVsOne() + oneVsOne);
        teamStats.setTwoVsOne(teamStats.getThreeVsOne() + twoVsOne);
        teamStats.setTwoVsTwo(teamStats.getTwoVsTwo() + twoVsTwo);
        teamStats.setThreeVsOne(teamStats.getThreeVsOne() + threeVsOne);
        teamStats.setThreeVsTwo(teamStats.getThreeVsTwo() + threeVsTwo);

        teamStatsDAO.save(teamStats);
    }
}
