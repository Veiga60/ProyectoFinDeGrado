package com.ikerveiga.app.dto;

import java.util.List;

import com.ikerveiga.app.enums.CallStatus;

public class CallDTO {

    private long id;
    private List<PlayerDTO> players;
    private MatchDTO match;
    private CallStatus status;

    public CallDTO(List<PlayerDTO> players, MatchDTO match, CallStatus status) {
        this.players = players;
        this.match = match;
        this.status = status;
    }

    public CallDTO(long id, List<PlayerDTO> players, MatchDTO match, CallStatus status) {
        this.id = id;
        this.players = players;
        this.match = match;
        this.status = status;
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

    public CallStatus getStatus() {
        return this.status;
    }

    public void setStatus(CallStatus status) {
        this.status = status;
    }

}
