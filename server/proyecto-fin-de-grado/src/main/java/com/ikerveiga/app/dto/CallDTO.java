package com.ikerveiga.app.DTO;

import java.util.List;
import java.util.Map;

import com.ikerveiga.app.enums.CallStatus;

public class CallDTO {

    private long id;
    private List<PlayerDTO> players;
    private MatchDTO match;
    private Map<Long, CallStatus> callPlayerStatus;

    public CallDTO() {

    }

    public CallDTO(List<PlayerDTO> players, MatchDTO match, Map<Long, CallStatus> callPlayerStatus) {
        this.players = players;
        this.match = match;
        this.callPlayerStatus = callPlayerStatus;
    }

    public CallDTO(long id, List<PlayerDTO> players, MatchDTO match, Map<Long, CallStatus> callPlayerStatus) {
        this.id = id;
        this.players = players;
        this.match = match;
        this.callPlayerStatus = callPlayerStatus;
    }

    public long getId() {
        return this.id;
    }

    public List<PlayerDTO> getPlayers() {
        return this.players;
    }

    public void setPlayers(List<PlayerDTO> players) {
        this.players = players;
    }

    public MatchDTO getMatch() {
        return this.match;
    }

    public void setMatch(MatchDTO match) {
        this.match = match;
    }

    public Map<Long, CallStatus> getCallPlayerStatus() {
        return this.callPlayerStatus;
    }

    public void setCallPlayerStatus(Map<Long, CallStatus> callPlayerStatus) {
        this.callPlayerStatus = callPlayerStatus;
    }
}
