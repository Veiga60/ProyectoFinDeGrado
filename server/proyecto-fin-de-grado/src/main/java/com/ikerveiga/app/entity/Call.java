package com.ikerveiga.app.entity;

import java.util.ArrayList;
import java.util.List;

import com.ikerveiga.app.dto.CallDTO;
import com.ikerveiga.app.dto.PlayerDTO;
import com.ikerveiga.app.enums.CallStatus;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
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

    @Enumerated
    @Column(name = "call_status", nullable = false, unique = false)
    private CallStatus status;

    public Call() {

    }

    public Call(List<Player> players, Match match, CallStatus status) {
        this.players = players;
        this.match = match;
        this.status = status;
    }

    public Call(long id, List<Player> players, Match match, CallStatus status) {
        this.id = id;
        this.players = players;
        this.match = match;
        this.status = status;
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

    public CallStatus getStatus() {
        return this.status;
    }

    public void setStatus(CallStatus status) {
        this.status = status;
    }

    public CallDTO toDTO() {
        List<PlayerDTO> playersDTO = new ArrayList<>();
        for (Player player : this.players) {
            playersDTO.add(player.toDTO());
        }

        CallDTO callDTO = new CallDTO(this.id, playersDTO, this.match.toDTO(), this.status);

        return callDTO;
    }

}
