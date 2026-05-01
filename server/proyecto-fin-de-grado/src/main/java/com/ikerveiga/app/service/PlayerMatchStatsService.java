package com.ikerveiga.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.dao.MatchRepository;
import com.ikerveiga.app.dao.PlayerMatchStatsRepository;
import com.ikerveiga.app.dao.PlayerRepository;
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

    public List<PlayerMatchStats> getPlayersMatchStats(long matchId) {
        List<PlayerMatchStats> playersMatchStats = playerMatchStatsDAO.findByMatchId(matchId);

        if (playersMatchStats == null) {
            throw new RuntimeException("There are no stats for the match");
        }

        return playersMatchStats;
    }

    public PlayerMatchStats getLastPlayedMatchPlayerMatchStats(long playerId) {
        Match match = matchDAO.findPlayedMatchesBackwards().get(0);

        if (match == null) {
            match = new Match();
        }

        PlayerMatchStats playerMatchStats = playerMatchStatsDAO.findByMatchIdAndPlayerId(match.getId(), playerId);

        if (playerMatchStats == null) {
            return new PlayerMatchStats(null, match, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        }

        return playerMatchStats;
    }
}
