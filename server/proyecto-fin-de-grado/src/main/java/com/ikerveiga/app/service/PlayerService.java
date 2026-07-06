package com.ikerveiga.app.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ikerveiga.app.dao.PlayerRepository;
import com.ikerveiga.app.entity.ClubTeam;
import com.ikerveiga.app.entity.Player;

@Service
public class PlayerService {

    PlayerRepository playerDAO;

    public PlayerService(PlayerRepository playerDAO) {
        this.playerDAO = playerDAO;
    }

    public List<Player> getPlayersByClubTeamId(long clubTeamId) {
        List<Player> playersToReturn = new ArrayList<>();
        List<Player> players = playerDAO.findAll();

        if (players.isEmpty()) {
            throw new RuntimeException("No se han encontrado jugadores");
        }

        for (Player player : players) {
            for (ClubTeam clubTeam : player.getClubTeams()) {
                if (clubTeam.getId() == clubTeamId) {
                    playersToReturn.add(player);
                }
            }
        }

        return playersToReturn;
    }

    public Player getPlayer(long id) {
        Player player = playerDAO.findById(id);

        if (player == null) {
            throw new RuntimeException("No se ha encontrado al jugador");
        }

        return player;
    }
}
