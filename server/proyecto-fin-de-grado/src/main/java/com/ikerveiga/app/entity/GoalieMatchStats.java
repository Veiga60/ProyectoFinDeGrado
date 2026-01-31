package com.ikerveiga.app.entity;

import com.ikerveiga.app.DTO.GoalieMatchStatsDTO;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "goalie_match_stats")
public class GoalieMatchStats {

    @Id
    @Column(name = "match_stats_id", nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "player_id", referencedColumnName = "player_id")
    private Player goalie;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "match_id", referencedColumnName = "match_id")
    private Match match;

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

    public GoalieMatchStats() {

    }

    public GoalieMatchStats(long id, Player goalie, Match match, int shotsReceived, int goalsReceived, int penaltyMins,
            int penaltyShotGoals, int penaltyShotSaves) {
        this.id = id;
        this.goalie = goalie;
        this.match = match;
        this.shotsReceived = shotsReceived;
        this.goalsReceived = goalsReceived;
        this.penaltyMins = penaltyMins;
        this.penaltyShotGoals = penaltyShotGoals;
        this.penaltyShotSaves = penaltyShotSaves;
    }

    public GoalieMatchStats(Player goalie, Match match, int shotsReceived, int goalsReceived, int penaltyMins,
            int penaltyShotGoals, int penaltyShotSaves) {
        this.goalie = goalie;
        this.match = match;
        this.shotsReceived = shotsReceived;
        this.goalsReceived = goalsReceived;
        this.penaltyMins = penaltyMins;
        this.penaltyShotGoals = penaltyShotGoals;
        this.penaltyShotSaves = penaltyShotSaves;
    }

    public long getId() {
        return this.id;
    }

    public Player getGoalie() {
        return this.goalie;
    }

    public void setGoalie(Player goalie) {
        this.goalie = goalie;
    }

    public Match getMatch() {
        return this.match;
    }

    public void setMatch(Match match) {
        this.match = match;
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

    public GoalieMatchStatsDTO toDTO() {
        GoalieMatchStatsDTO goalieMatchStatsDTO = new GoalieMatchStatsDTO(this.id, this.goalie.toDTO(),
                this.match.toDTO(), this.shotsReceived, this.goalsReceived, this.penaltyMins, this.penaltyShotGoals,
                this.penaltyShotSaves);

        return goalieMatchStatsDTO;
    }
}
