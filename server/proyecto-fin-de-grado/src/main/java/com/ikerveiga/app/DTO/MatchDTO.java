package com.ikerveiga.app.DTO;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.ikerveiga.app.entity.Player;
import com.ikerveiga.app.entity.Team;

public class MatchDTO {

    private long id;
    private Team localTeam;
    private Integer localTeamGoals;
    private Team visitingTeam;
    private Integer visitingTeamGoals;
    private LocalDate date;
    private LocalTime time;
    private boolean isPlayed;
    private Long bonusPoint;
    private List<Player> players;

    public MatchDTO(Team localTeam, Integer localTeamGoals, Team visitingTeam, Integer visitingTeamGoals,
            LocalDate date,
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

    public MatchDTO(long id, Team localTeam, Integer localTeamGoals, Team visitingTeam, Integer visitingTeamGoals,
            LocalDate date, LocalTime time, boolean isPlayed, Long bonusPoint, List<Player> players) {
        this.id = id;
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

    public Integer getVisitingTeamGoals() {
        return this.visitingTeamGoals;
    }

    public void setVisitingTeamGoals(Integer visitingTeamGoals) {
        this.visitingTeamGoals = visitingTeamGoals;
    }

    public Team getVisitingTeam() {
        return this.visitingTeam;
    }

    public void setVisitingTeam(Team visitingTeam) {
        this.visitingTeam = visitingTeam;
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
}
