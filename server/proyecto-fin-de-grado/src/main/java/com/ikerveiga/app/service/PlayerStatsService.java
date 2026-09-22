package com.ikerveiga.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.dao.PlayerStatsRepository;
import com.ikerveiga.app.entity.PlayerStats;

@Service
public class PlayerStatsService {

    private PlayerStatsRepository playerStatsDAO;

    @Autowired
    public PlayerStatsService(PlayerStatsRepository playerStatsDAO) {
        this.playerStatsDAO = playerStatsDAO;
    }

    public PlayerStats getPlayerStatsofPlayerOfClubTeam(long playerId, long clubTeamId) {
        PlayerStats playerStats = playerStatsDAO.findByPlayerIdAndClubTeamId(playerId, clubTeamId);

        if (playerStats == null)
            throw new RuntimeException("No se han encontrado estadísticas");

        return playerStats;
    }

    public void updatePlayersStats(long playerId, long clubTeamId, int goals, int assists, int plusMinus, int shots,
            int goodPasses,
            int badPasses, int recoveredPucks, int lostPucks, int penaltyMins, int penaltyShotGoals,
            int penaltyShotMisses) {
        PlayerStats playerStats = playerStatsDAO.findByPlayerIdAndClubTeamId(playerId, clubTeamId);

        if (playerStats == null) {
            throw new RuntimeException("Player stats not found");
        }

        playerStats.setGamesPlayed(playerStats.getGamesPlayed() + 1);
        playerStats.setGoals(playerStats.getGoals() + goals);
        playerStats.setAssists(playerStats.getAssists() + assists);
        playerStats.setPlusMinus(playerStats.getPlusMinus() + plusMinus);
        playerStats.setShots(playerStats.getShots() + shots);
        playerStats.setGoodPasses(playerStats.getGoodPasses() + goodPasses);
        playerStats.setBadPasses(playerStats.getBadPasses() + badPasses);
        playerStats.setRecoveredPucks(playerStats.getRecoveredPucks() + recoveredPucks);
        playerStats.setLostPucks(playerStats.getLostPucks() + lostPucks);
        playerStats.setPenaltyMins(playerStats.getPenaltyMins() + penaltyMins);
        playerStats.setPenaltyShotGoals(playerStats.getPenaltyShotGoals() + penaltyShotGoals);
        playerStats
                .setPenaltyShotMisses(playerStats.getPenaltyShotMisses() + penaltyShotMisses);

        playerStatsDAO.save(playerStats);
    }
}
