package com.ikerveiga.app.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.dao.CallRepository;
import com.ikerveiga.app.dao.MatchRepository;
import com.ikerveiga.app.dao.PlayerRepository;
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

            callDAO.save(call);
        } else {
            Player calledPlayer = playerDAO.findById(playerId);
            existingCall.getPlayers().add(calledPlayer);
            existingCall.getCallPlayerStatus().put(calledPlayer, CallStatus.PENDING);

            callDAO.save(existingCall);
        }
    }
}
