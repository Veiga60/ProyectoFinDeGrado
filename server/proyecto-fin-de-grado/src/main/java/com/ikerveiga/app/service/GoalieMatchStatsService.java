package com.ikerveiga.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.dao.MatchRepository;
import com.ikerveiga.app.dao.GoalieMatchStatsRepository;
import com.ikerveiga.app.dao.PlayerRepository;
import com.ikerveiga.app.entity.GoalieMatchStats;
import com.ikerveiga.app.entity.Match;
import com.ikerveiga.app.entity.Player;

@Service
public class GoalieMatchStatsService {

    private GoalieMatchStatsRepository goalieMatchStatsDAO;
    private PlayerRepository playerDAO;
    private MatchRepository matchDAO;

    @Autowired
    public GoalieMatchStatsService(GoalieMatchStatsRepository playerMatchStatsDAO, PlayerRepository playerDAO,
            MatchRepository matchDAO) {
        this.goalieMatchStatsDAO = playerMatchStatsDAO;
        this.playerDAO = playerDAO;
        this.matchDAO = matchDAO;
    }

    public void saveGoalieMatchStats(int shotsReceived, int goalsReceived, int penaltyMins, int penaltyShotGoals,
            int penaltyShotSaves,
            long playerId, long matchId) {
        GoalieMatchStats existingGoalieMatchStats = goalieMatchStatsDAO.findByMatchIdAndPlayerId(matchId, playerId);
        Player goalie = playerDAO.findById(playerId);
        Match match = matchDAO.findById(matchId);

        if (goalie == null) {
            throw new RuntimeException("Goalie not found");
        }

        if (match == null) {
            throw new RuntimeException("Match not found");
        }

        if (existingGoalieMatchStats == null) {
            GoalieMatchStats goalieMatchStats = new GoalieMatchStats(goalie, match, shotsReceived,
                    goalsReceived,
                    penaltyMins, penaltyShotGoals, penaltyShotSaves);

            goalieMatchStatsDAO.save(goalieMatchStats);
        } else {
            existingGoalieMatchStats.setShotsReceived(shotsReceived);
            existingGoalieMatchStats.setGoalsReceived(goalsReceived);
            existingGoalieMatchStats.setPenaltyMins(penaltyMins);
            existingGoalieMatchStats.setPenaltyShotGoals(penaltyShotGoals);
            existingGoalieMatchStats.setPenaltyShotSaves(penaltyShotSaves);

            goalieMatchStatsDAO.save(existingGoalieMatchStats);
        }
    }

    public GoalieMatchStats getGoalieMatchStats(long playerId, long matchId) {
        GoalieMatchStats goalieMatchStats = goalieMatchStatsDAO.findByMatchIdAndPlayerId(matchId, playerId);
        Player goalie = playerDAO.findById(playerId);
        Match match = matchDAO.findById(matchId);

        if (goalieMatchStats == null) {
            return new GoalieMatchStats(goalie, match, 0, 0, 0, 0, 0);
        }

        return goalieMatchStats;
    }
}
