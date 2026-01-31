package com.ikerveiga.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.DAO.MatchRepository;
import com.ikerveiga.app.DAO.PlayerMatchStatsRepository;
import com.ikerveiga.app.DAO.PlayerRepository;
import com.ikerveiga.app.entity.Match;
import com.ikerveiga.app.entity.Player;
import com.ikerveiga.app.entity.PlayerMatchStats;

@Service
public class PlayerMatchStatsService {

    private PlayerMatchStatsRepository playerMatchStatsDAO;
    private PlayerRepository playerDAO;
    private MatchRepository matchDAO;

    @Autowired
    public PlayerMatchStatsService(PlayerMatchStatsRepository playerMatchStatsDAO, PlayerRepository playerDAO,
            MatchRepository matchDAO) {
        this.playerMatchStatsDAO = playerMatchStatsDAO;
        this.playerDAO = playerDAO;
        this.matchDAO = matchDAO;
    }

    public void savePlayerMatchStats(int goals, int assists, int plusMinus, int shots, int goodPasses, int badPasses,
            int recoveredPucks, int lostPucks, int penaltyMins, int penaltyShotGoals, int penaltyShotMisses,
            long playerId, long matchId) {
        PlayerMatchStats existingPlayerMatchStats = playerMatchStatsDAO.findByMatchIdAndPlayerId(matchId, playerId);
        Player player = playerDAO.findById(playerId);
        Match match = matchDAO.findById(matchId);

        if (player == null) {
            throw new RuntimeException("Player not found");
        }

        if (match == null) {
            throw new RuntimeException("Match not found");
        }

        if (existingPlayerMatchStats == null) {
            PlayerMatchStats playerMatchStats = new PlayerMatchStats(player, match, goals,
                    assists, plusMinus, shots,
                    goodPasses,
                    badPasses, recoveredPucks, lostPucks,
                    penaltyMins, penaltyShotGoals, penaltyShotMisses);

            playerMatchStatsDAO.save(playerMatchStats);
        } else {
            existingPlayerMatchStats.setGoals(goals);
            existingPlayerMatchStats.setAssists(assists);
            existingPlayerMatchStats.setPlusMinus(plusMinus);
            existingPlayerMatchStats.setShots(shots);
            existingPlayerMatchStats.setGoodPasses(goodPasses);
            existingPlayerMatchStats.setBadPasses(badPasses);
            existingPlayerMatchStats.setRecoveredPucks(recoveredPucks);
            existingPlayerMatchStats.setLostPucks(lostPucks);
            existingPlayerMatchStats.setPenaltyMins(penaltyMins);
            existingPlayerMatchStats.setPenaltyShotGoals(penaltyShotGoals);
            existingPlayerMatchStats.setPenaltyShotMisses(penaltyShotMisses);

            playerMatchStatsDAO.save(existingPlayerMatchStats);
        }
    }

    public PlayerMatchStats getPlayerMatchStats(long playerId, long matchId) {
        PlayerMatchStats playerMatchStats = playerMatchStatsDAO.findByMatchIdAndPlayerId(matchId, playerId);
        Player player = playerDAO.findById(playerId);
        Match match = matchDAO.findById(matchId);

        if (playerMatchStats == null) {
            return new PlayerMatchStats(player, match, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        }

        return playerMatchStats;
    }
}
