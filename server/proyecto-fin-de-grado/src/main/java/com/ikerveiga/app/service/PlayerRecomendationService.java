package com.ikerveiga.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.dao.MatchRepository;
import com.ikerveiga.app.dao.PlayerRecomendationRepository;
import com.ikerveiga.app.dao.PlayerRepository;
import com.ikerveiga.app.entity.Match;
import com.ikerveiga.app.entity.Player;
import com.ikerveiga.app.entity.PlayerRecomendation;

@Service
public class PlayerRecomendationService {

    PlayerRecomendationRepository playerRecomendationDAO;
    MatchRepository matchDAO;
    PlayerRepository playerDAO;

    @Autowired
    public PlayerRecomendationService(PlayerRecomendationRepository playerRecomendationDAO, MatchRepository matchDAO,
            PlayerRepository playerDAO) {
        this.playerRecomendationDAO = playerRecomendationDAO;
        this.matchDAO = matchDAO;
        this.playerDAO = playerDAO;
    }

    public void createPlayerRecomendation(String area, String description, long matchId, long playerId) {
        Match match = matchDAO.findById(matchId);
        Player player = playerDAO.findById(playerId);

        if (match == null) {
            throw new RuntimeException("Match not found");
        }

        if (player == null) {
            throw new RuntimeException("Player not found");
        }

        PlayerRecomendation playerRecomendation = new PlayerRecomendation(area, description, player, match);

        playerRecomendationDAO.save(playerRecomendation);
    }
}
