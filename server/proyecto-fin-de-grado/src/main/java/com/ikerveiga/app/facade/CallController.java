package com.ikerveiga.app.facade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ikerveiga.app.service.CallService;

@RestController
public class CallController {

    private CallService callsService;

    @Autowired
    public CallController(CallService callsService) {
        this.callsService = callsService;
    }

    @PostMapping("/calls/matches/{matchId}/players/{playerId}")
    public ResponseEntity<Void> callPlayer(@PathVariable("matchId") long matchId,
            @PathVariable("playerId") long playerId) {
        try {
            callsService.callPlayer(matchId, playerId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }
}
