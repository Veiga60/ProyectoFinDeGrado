package com.ikerveiga.app.entity;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import com.ikerveiga.app.dto.MatchDTO;
import com.ikerveiga.app.dto.PlayerDTO;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Matches")
public class Match {

    @Id
    @Column(name = "match_id", nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(optional = false, cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Team localTeam;

    @Column(name = "local_team_goals", nullable = true, unique = false)
    private Integer localTeamGoals;

    @ManyToOne(optional = false, cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Team visitingTeam;

    @Column(name = "visiting_team_goals", nullable = true, unique = false)
    private Integer visitingTeamGoals;

    @Column(name = "match_date", nullable = true, unique = false)
    private LocalDate date;

    @Column(name = "match_time", nullable = true, unique = false)
    private LocalTime time;

    @Column(name = "match_played", nullable = false, unique = false)
    private boolean isPlayed;

    @Column(name = "match_bonus_point", nullable = true, unique = false)
    private Long bonusPoint;

    @ManyToMany
    @JoinTable(name = "player_match", joinColumns = @JoinColumn(name = "match_id"), inverseJoinColumns = @JoinColumn(name = "player_id"))
    private List<Player> players;

    public Match() {

    }

    public Match(Team localTeam, Integer localTeamGoals, Team visitingTeam, Integer visitingTeamGoals, LocalDate date,
            LocalTime time, boolean isPlayed, Long bonusPoint, List<Player> players) {
        this.localTeam = localTeam;
        this.localTeamGoals = localTeamGoals;
        this.visitingTeam = visitingTeam;
        this.visitingTeamGoals = visitingTeamGoals;
        this.date = date;
        this.time = time;
        this.isPlayed = isPlayed;
        this.bonusPoint = bonusPoint;
        this.players = players;
    }

    public long getId() {
        return this.id;
    }

    public Team getLocalTeam() {
        return this.localTeam;
    }

    public void setLocalTeam(Team localTeam) {
        this.localTeam = localTeam;
    }

    public Integer getLocalTeamGoals() {
        return this.localTeamGoals;
    }

    public void setLocalTeamGoals(Integer localTeamGoals) {
        this.localTeamGoals = localTeamGoals;
    }

    public Team getVisitingTeam() {
        return this.visitingTeam;
    }

    public void setVisitingTeam(Team visitingTeam) {
        this.visitingTeam = visitingTeam;
    }

    public Integer getVisitingTeamGoals() {
        return this.visitingTeamGoals;
    }

    public void setVisitingTeamGoals(Integer visitingTeamGoals) {
        this.visitingTeamGoals = visitingTeamGoals;
    }

    public LocalDate getDate() {
        return this.date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getTime() {
        return this.time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public boolean getIsPlayed() {
        return this.isPlayed;
    }

    public void setIsPlayed(boolean isPlayed) {
        this.isPlayed = isPlayed;
    }

    public Long getBonusPoint() {
        return this.bonusPoint;
    }

    public void setBonusPoint(Long bonusPoint) {
        this.bonusPoint = bonusPoint;
    }

    public List<Player> getPlayers() {
        return this.players;
    }

    public void setPlayers(List<Player> players) {
        this.players = players;
    }

    public MatchDTO toDTO() {
        List<PlayerDTO> playersDTO = new ArrayList<>();
        for (Player player : this.players) {
            playersDTO.add(player.toDTO());
        }

        MatchDTO matchDTO = new MatchDTO(this.id, this.localTeam.toDTO(), this.localTeamGoals,
                this.visitingTeam.toDTO(),
                this.visitingTeamGoals, this.date, this.time, this.isPlayed, this.bonusPoint, playersDTO);

        return matchDTO;
    }
}
