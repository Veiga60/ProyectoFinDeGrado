package com.ikerveiga.app.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ikerveiga.app.DAO.PlayerRepository;
import com.ikerveiga.app.entity.Player;

@Service
public class PlayerService {

    PlayerRepository playerDAO;

    public PlayerService(PlayerRepository playerDAO) {
        this.playerDAO = playerDAO;
    }

    public List<Player> getPlayers() {
        List<Player> players = playerDAO.findAll();

        if (players.isEmpty()) {
            throw new RuntimeException("No se han encontrado jugadores");
        }

        return players;
    }
}
