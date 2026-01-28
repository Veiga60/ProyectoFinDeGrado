package com.ikerveiga.app.facade;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ikerveiga.app.dto.CallDTO;
import com.ikerveiga.app.entity.Call;
import com.ikerveiga.app.service.CallService;

@RestController
public class CallController {

    private CallService callsService;

    @Autowired
    public CallController(CallService callsService) {
        this.callsService = callsService;
    }

    @GetMapping("/call/matches/{matchId}")
    public ResponseEntity<CallDTO> getCall(@PathVariable("matchId") long matchId) {
        try {
            CallDTO callDTO = callsService.getCall(matchId).toDTO();
            return ResponseEntity.ok(callDTO);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("Call for that match not found")) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }

    @Secured("ROLE_COACH")
    @PostMapping("/calls/match/{matchId}/players/{playerId}")
    public ResponseEntity<Void> callPlayer(@PathVariable("matchId") long matchId,
            @PathVariable("playerId") long playerId) {
        try {
            callsService.callPlayer(matchId, playerId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("Player is already called")) {
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }

    @GetMapping("/calls/player/{playerId}")
    public ResponseEntity<List<CallDTO>> getCallsOfPlayer(@PathVariable("playerId") long playerId) {
        try {
            List<CallDTO> callsDTO = new ArrayList<>();
            List<Call> calls = callsService.getCallsOfPlayer(playerId);
            for (Call call : calls) {
                callsDTO.add(call.toDTO());
            }

            return ResponseEntity.ok(callsDTO);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("Player not found")) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }

    @Secured("ROLE_PLAYER")
    @PutMapping("/calls/{callId}/players/{playerId}")
    public ResponseEntity<Void> setAttendance(@PathVariable("callId") long callId,
            @PathVariable("playerId") long playerId,
            @RequestParam("attendance") boolean attendance) {
        try {
            callsService.setAttendance(callId, playerId, attendance);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("Call not found") || e.getMessage().equals("Player not found")) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }
}
