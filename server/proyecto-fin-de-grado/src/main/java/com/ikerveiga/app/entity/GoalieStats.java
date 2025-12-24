package com.ikerveiga.app.entity;

import com.ikerveiga.app.DTO.GoalieStatsDTO;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "goalies_stats")
public class GoalieStats {

    @Id
    @Column(name = "goalie_stats_id", nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "player_id", referencedColumnName = "player_id")
    private Player goalie;

    @Column(name = "games_played", nullable = false, unique = false)
    private int gamesPlayed;

    @Column(name = "shots_received", nullable = false, unique = false)
    private int shotsReceived;

    @Column(name = "goals_received", nullable = false, unique = false)
    private int goalsReceived;

    @Column(name = "penalty_mins", nullable = false, unique = false)
    private int penaltyMins;

    @Column(name = "penalty_shot_goals", nullable = false, unique = false)
    private int penaltyShotGoals;

    @Column(name = "penalty_shot_saves", nullable = false, unique = false)
    private int penaltyShotSaves;

    public GoalieStats() {

    }

    public GoalieStats(Player goalie, int gamesPlayed, int shotsReceived, int goalsReceived, int penaltyMins,
            int penaltyShotGoals, int penaltyShotSaves) {
        this.goalie = goalie;
        this.gamesPlayed = gamesPlayed;
        this.shotsReceived = shotsReceived;
        this.goalsReceived = goalsReceived;
        this.penaltyMins = penaltyMins;
        this.penaltyShotGoals = penaltyShotGoals;
        this.penaltyShotSaves = penaltyShotSaves;
    }

    public GoalieStats(int gamesPlayed, int shotsReceived, int goalsReceived, int penaltyMins,
            int penaltyShotGoals, int penaltyShotSaves) {
        this.gamesPlayed = gamesPlayed;
        this.shotsReceived = shotsReceived;
        this.goalsReceived = goalsReceived;
        this.penaltyMins = penaltyMins;
        this.penaltyShotGoals = penaltyShotGoals;
        this.penaltyShotSaves = penaltyShotSaves;
    }

    public Player getGoalie() {
        return this.goalie;
    }

    public void setGoalie(Player goalie) {
        this.goalie = goalie;
    }

    public int getGamesPlayed() {
        return this.gamesPlayed;
    }

    public void setGamesPlayed(int gamesPlayed) {
        this.gamesPlayed = gamesPlayed;
    }

    public int getShotsReceived() {
        return this.shotsReceived;
    }

    public void setShotsReceived(int shotsReceived) {
        this.shotsReceived = shotsReceived;
    }

    public int getGoalsReceived() {
        return this.goalsReceived;
    }

    public void setGoalsReceived(int goalsReceived) {
        this.goalsReceived = goalsReceived;
    }

    public int getPenaltyMins() {
        return this.penaltyMins;
    }

    public void setPenaltyMins(int penaltyMins) {
        this.penaltyMins = penaltyMins;
    }

    public int getPenaltyShotGoals() {
        return this.penaltyShotGoals;
    }

    public void setPenaltyShotGoals(int penaltyShotGoals) {
        this.penaltyShotGoals = penaltyShotGoals;
    }

    public int getPenaltyShotSaves() {
        return this.penaltyShotSaves;
    }

    public void setPenaltyShotSaves(int penaltyShotSaves) {
        this.penaltyShotSaves = penaltyShotSaves;
    }

    public GoalieStatsDTO toDTO() {
        GoalieStatsDTO goalieStatsDTO = new GoalieStatsDTO(this.id, this.goalie.toDTOWithoutStats(), this.gamesPlayed,
                this.shotsReceived, this.goalsReceived, this.penaltyMins, this.penaltyShotGoals, this.penaltyShotSaves);

        return goalieStatsDTO;
    }

    public GoalieStatsDTO toDTOWithoutGoalie() {
        GoalieStatsDTO goalieStatsDTO = new GoalieStatsDTO(this.id, this.gamesPlayed,
                this.shotsReceived, this.goalsReceived, this.penaltyMins, this.penaltyShotGoals, this.penaltyShotSaves);

        return goalieStatsDTO;
    }
}
