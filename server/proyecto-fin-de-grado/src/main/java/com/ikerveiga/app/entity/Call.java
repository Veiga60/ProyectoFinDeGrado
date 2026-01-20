package com.ikerveiga.app.entity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ikerveiga.app.dto.CallDTO;
import com.ikerveiga.app.dto.PlayerDTO;
import com.ikerveiga.app.enums.CallStatus;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.MapKeyJoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "calls")
public class Call {

    @Id
    @Column(name = "call_id", nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToMany
    @JoinTable(name = "player_call", joinColumns = @JoinColumn(name = "call_id"), inverseJoinColumns = @JoinColumn(name = "player_id"))
    private List<Player> players;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "match_id", referencedColumnName = "match_id")
    private Match match;

    @ElementCollection
    @MapKeyJoinColumn(name = "player_id")
    @Column(name = "call_player_status", nullable = false, unique = false)
    @CollectionTable(name = "calls_players_status", joinColumns = @JoinColumn(name = "call_id"))
    private Map<Player, CallStatus> callPlayerStatus;

    public Call() {

    }

    public Call(List<Player> players, Match match, Map<Player, CallStatus> callPlayerStatus) {
        this.players = players;
        this.match = match;
        this.callPlayerStatus = callPlayerStatus;
    }

    public Call(long id, List<Player> players, Match match, Map<Player, CallStatus> callPlayerStatus) {
        this.id = id;
        this.players = players;
        this.match = match;
        this.callPlayerStatus = callPlayerStatus;
    }

    public long getId() {
        return this.id;
    }

    public List<Player> getPlayers() {
        return this.players;
    }

    public void setPlayers(List<Player> players) {
        this.players = players;
    }

    public Match getMatch() {
        return this.match;
    }

    public void setMatch(Match match) {
        this.match = match;
    }

    public Map<Player, CallStatus> getCallPlayerStatus() {
        return this.callPlayerStatus;
    }

    public void setCallPlayerStatus(Map<Player, CallStatus> callPlayerStatus) {
        this.callPlayerStatus = callPlayerStatus;
    }

    public CallDTO toDTO() {
        List<PlayerDTO> playersDTO = new ArrayList<>();
        for (Player player : this.players) {
            playersDTO.add(player.toDTOWithoutStatsAndCalls());
        }

        Map<Long, CallStatus> callPlayerStatus = new HashMap<>();

        for (Player player : this.callPlayerStatus.keySet()) {
            callPlayerStatus.put(player.getId(), this.callPlayerStatus.get(player));
        }

        CallDTO callDTO = new CallDTO(this.id, playersDTO, this.match.toDTOwithoutCalls(), callPlayerStatus);

        return callDTO;
    }

}
