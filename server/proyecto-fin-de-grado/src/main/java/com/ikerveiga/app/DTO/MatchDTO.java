package com.ikerveiga.app.DTO;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public class MatchDTO {

    private long id;
    private TeamDTO localTeam;
    private Integer localTeamGoals;
    private TeamDTO visitingTeam;
    private Integer visitingTeamGoals;
    private LocalDate date;
    private LocalTime time;
    private boolean isPlayed;
    private Long bonusPoint;
    private List<PlayerDTO> players;

    public MatchDTO(TeamDTO localTeam, Integer localTeamGoals, TeamDTO visitingTeam, Integer visitingTeamGoals,
            LocalDate date,
            LocalTime time, boolean isPlayed, Long bonusPoint, List<PlayerDTO> players) {
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

    public MatchDTO(long id, TeamDTO localTeam, Integer localTeamGoals, TeamDTO visitingTeam, Integer visitingTeamGoals,
            LocalDate date, LocalTime time, boolean isPlayed, Long bonusPoint, List<PlayerDTO> players) {
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

    public TeamDTO getLocalTeam() {
        return this.localTeam;
    }

    public void setLocalTeam(TeamDTO localTeam) {
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

    public TeamDTO getVisitingTeam() {
        return this.visitingTeam;
    }

    public void setVisitingTeam(TeamDTO visitingTeam) {
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

    public List<PlayerDTO> getPlayers() {
        return this.players;
    }

    public void setPlayers(List<PlayerDTO> players) {
        this.players = players;
    }
}
