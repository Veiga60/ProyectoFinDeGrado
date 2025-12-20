package com.ikerveiga.app.DTO;

import java.time.LocalDate;
import java.time.LocalTime;

import com.ikerveiga.app.entity.Team;

public class MatchDTO {

    private long id;
    private Team localTeam;
    private Team visitingTeam;
    private LocalDate date;
    private LocalTime time;
    private boolean isPlayed;

    public MatchDTO(Team localTeam, Team visitingTeam, LocalDate date, LocalTime time, boolean isPlayed) {
        this.localTeam = localTeam;
        this.visitingTeam = visitingTeam;
        this.date = date;
        this.time = time;
        this.isPlayed = isPlayed;
    }

    public MatchDTO(long id, Team localTeam, Team visitingTeam, LocalDate date, LocalTime time, boolean isPlayed) {
        this.id = id;
        this.localTeam = localTeam;
        this.visitingTeam = visitingTeam;
        this.date = date;
        this.time = time;
        this.isPlayed = isPlayed;
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
}
