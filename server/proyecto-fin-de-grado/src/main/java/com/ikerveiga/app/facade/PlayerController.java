package com.ikerveiga.app.facade;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.ikerveiga.app.DTO.PlayerDTO;
import com.ikerveiga.app.entity.Player;
import com.ikerveiga.app.service.PlayerService;

@RestController
public class PlayerController {

    PlayerService playerService;

    @Autowired
    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping("/players")
    public ResponseEntity<List<PlayerDTO>> getPlayers() {
        List<Player> players;
        List<PlayerDTO> playersDTO = new ArrayList<>();

        try {
            players = playerService.getPlayers();
            for (Player player : players) {
                PlayerDTO playerDTO = player.toDTOWithoutStats();
                playersDTO.add(playerDTO);
            }

            return ResponseEntity.ok(playersDTO);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("No se han encontrado jugadores")) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                e.printStackTrace();
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }

    @GetMapping("/players/{id}")
    public ResponseEntity<PlayerDTO> getPlayer(@PathVariable("id") long id) {
        try {
            Player player = playerService.getPlayer(id);
            PlayerDTO playerDTO = player.toDTO();
            return ResponseEntity.ok(playerDTO);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("No se ha encontrado al jugador")) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }
}
