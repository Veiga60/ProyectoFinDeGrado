package com.ikerveiga.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.dao.GoalieStatsRepository;
import com.ikerveiga.app.entity.GoalieStats;

@Service
public class GoalieStatsService {

    private GoalieStatsRepository goalieStatsDAO;

    @Autowired
    public GoalieStatsService(GoalieStatsRepository goalieStatsDAO) {
        this.goalieStatsDAO = goalieStatsDAO;
    }

    public GoalieStats getGoalieStatsofPlayerOfClubTeam(long playerId, long clubTeamId) {
        GoalieStats goalieStats = goalieStatsDAO.findByPlayerIdAndClubTeamId(playerId, clubTeamId);

        if (goalieStats == null)
            throw new RuntimeException("No se han encontrado estadísticas");

        return goalieStats;
    }

    public void updateGoaliesStats(long goalieId, int goalsReceived, int shotsReceived, int penaltyMins,
            int penaltyShotGoals,
            int penaltyShotSaves) {
        GoalieStats goalieStats = goalieStatsDAO.findByGoalieId(goalieId);

        if (goalieStats == null) {
            throw new RuntimeException("Player stats not found");
        }

        goalieStats.setGamesPlayed(goalieStats.getGamesPlayed() + 1);
        goalieStats.setGoalsReceived(goalieStats.getGoalsReceived() + goalsReceived);
        goalieStats.setShotsReceived(goalieStats.getShotsReceived() + shotsReceived);
        goalieStats.setPenaltyMins(goalieStats.getPenaltyMins() + penaltyMins);
        goalieStats.setPenaltyShotGoals(goalieStats.getPenaltyShotGoals() + penaltyShotGoals);
        goalieStats
                .setPenaltyShotSaves(goalieStats.getPenaltyShotSaves() + penaltyShotSaves);

        goalieStatsDAO.save(goalieStats);
    }
}
