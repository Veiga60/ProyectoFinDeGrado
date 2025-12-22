package com.ikerveiga.app.facade;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.ikerveiga.app.DTO.PlayerDTO;
import com.ikerveiga.app.entity.Player;
import com.ikerveiga.app.service.PlayerService;

@Controller
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
                PlayerDTO playerDTO = new PlayerDTO(player.getId(), player.getName(), player.getLastName1(),
                        player.getLastName2(),
                        player.getPhoto(), player.getMatches());
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
}
