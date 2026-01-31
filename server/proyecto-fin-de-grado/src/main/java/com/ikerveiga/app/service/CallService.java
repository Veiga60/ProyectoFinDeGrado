package com.ikerveiga.app.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.DAO.CallRepository;
import com.ikerveiga.app.DAO.MatchRepository;
import com.ikerveiga.app.DAO.PlayerRepository;
import com.ikerveiga.app.entity.Call;
import com.ikerveiga.app.entity.Match;
import com.ikerveiga.app.entity.Player;
import com.ikerveiga.app.enums.CallStatus;

@Service
public class CallService {

    private CallRepository callDAO;
    private PlayerRepository playerDAO;
    private MatchRepository matchDAO;

    @Autowired
    public CallService(CallRepository callDAO, PlayerRepository playerDAO, MatchRepository matchDAO) {
        this.callDAO = callDAO;
        this.playerDAO = playerDAO;
        this.matchDAO = matchDAO;
    }

    public Call getCall(long matchId) {
        Call call = callDAO.findByMatchId(matchId);

        if (call == null) {
            throw new RuntimeException("Call for that match not found");
        }

        return call;
    }

    public void callPlayer(long matchId, long playerId) {
        Call existingCall = callDAO.findByMatchId(matchId);
        Match match = matchDAO.findById(matchId);

        if (existingCall == null) {
            List<Player> calledPlayers = new ArrayList<>();
            Map<Player, CallStatus> callPlayerStatus = new HashMap<>();
            Player calledPlayer = playerDAO.findById(playerId);

            calledPlayers.add(calledPlayer);
            callPlayerStatus.put(calledPlayer, CallStatus.PENDING);

            Call call = new Call(calledPlayers, match, callPlayerStatus);

            match.setCall(call);

            callDAO.save(call);
            matchDAO.save(match);
        } else {
            Player calledPlayer = playerDAO.findById(playerId);

            if (existingCall.getPlayers().contains(calledPlayer)) {
                throw new RuntimeException("Player is already called");
            }

            existingCall.getPlayers().add(calledPlayer);
            existingCall.getCallPlayerStatus().put(calledPlayer, CallStatus.PENDING);

            callDAO.save(existingCall);
        }
    }

    public List<Call> getCallsOfPlayer(long playerId) {
        Player player = playerDAO.findById(playerId);

        if (player == null) {
            throw new RuntimeException("Player not found");
        }

        List<Call> calls = player.getCalls();

        return calls;

    }

    public void setAttendance(long callId, long playerId, boolean attendance) {
        Call call = callDAO.findById(callId);
        Player player = playerDAO.findById(playerId);

        if (call == null) {
            throw new RuntimeException("Call not found");
        }

        if (player == null) {
            throw new RuntimeException("Player not found");
        }

        if (attendance == true) {
            call.getCallPlayerStatus().put(player, CallStatus.CONFIRMED);
        } else {
            call.getCallPlayerStatus().put(player, CallStatus.OUT);
        }

        callDAO.save(call);
    }
}
