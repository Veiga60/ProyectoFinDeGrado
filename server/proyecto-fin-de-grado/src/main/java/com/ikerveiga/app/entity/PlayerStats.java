package com.ikerveiga.app.entity;

import com.ikerveiga.app.dto.PlayerStatsDTO;

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
@Table(name = "Players_Stats")
public class PlayerStats {

    @Id
    @Column(name = "player_stats_id", nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "player_id", referencedColumnName = "player_id")
    private Player player;

    @Column(name = "games_played", nullable = false, unique = false)
    private int gamesPlayed;

    @Column(name = "goals", nullable = false, unique = false)
    private int goals;

    @Column(name = "assists", nullable = false, unique = false)
    private int assists;

    @Column(name = "plus_minus", nullable = false, unique = false)
    private int plusMinus;

    @Column(name = "shots", nullable = false, unique = false)
    private int shots;

    @Column(name = "good_passes", nullable = false, unique = false)
    private int goodPasses;

    @Column(name = "bad_passes", nullable = false, unique = false)
    private int badPasses;

    @Column(name = "recovered_pucks", nullable = false, unique = false)
    private int recoveredPucks;

    @Column(name = "lost_pucks", nullable = false, unique = false)
    private int lostPucks;

    @Column(name = "penalty_mins", nullable = false, unique = false)
    private int penaltyMins;

    @Column(name = "penalty_shot_goals", nullable = false, unique = false)
    private int penaltyShotGoals;

    @Column(name = "penalty_shot_misses", nullable = false, unique = false)
    private int penaltyShotMisses;

    public PlayerStats() {

    }

    public PlayerStats(Player player, int gamesPlayed, int goals, int assists, int plusMinus, int shots,
            int goodPasses,
            int badPasses, int recoveredPucks, int lostPucks, int penaltyMins, int penaltyShotGoals,
            int penaltyShotMisses) {
        this.player = player;
        this.gamesPlayed = gamesPlayed;
        this.goals = goals;
        this.assists = assists;
        this.plusMinus = plusMinus;
        this.shots = shots;
        this.goodPasses = goodPasses;
        this.badPasses = badPasses;
        this.recoveredPucks = recoveredPucks;
        this.lostPucks = lostPucks;
        this.penaltyMins = penaltyMins;
        this.penaltyShotGoals = penaltyShotGoals;
        this.penaltyShotMisses = penaltyShotMisses;
    }

    public PlayerStats(int gamesPlayed, int goals, int assists, int plusMinus, int shots,
            int goodPasses,
            int badPasses, int recoveredPucks, int lostPucks, int penaltyMins, int penaltyShotGoals,
            int penaltyShotMisses) {
        this.gamesPlayed = gamesPlayed;
        this.goals = goals;
        this.assists = assists;
        this.plusMinus = plusMinus;
        this.shots = shots;
        this.goodPasses = goodPasses;
        this.badPasses = badPasses;
        this.recoveredPucks = recoveredPucks;
        this.lostPucks = lostPucks;
        this.penaltyMins = penaltyMins;
        this.penaltyShotGoals = penaltyShotGoals;
        this.penaltyShotMisses = penaltyShotMisses;
    }

    public Player getPlayer() {
        return this.player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    public int getGamesPlayed() {
        return this.gamesPlayed;
    }

    public void setGamesPlayed(int gamesPlayed) {
        this.gamesPlayed = gamesPlayed;
    }

    public int getGoals() {
        return this.goals;
    }

    public void setGoals(int goals) {
        this.goals = goals;
    }

    public int getAssists() {
        return this.assists;
    }

    public void setAssists(int assists) {
        this.assists = assists;
    }

    public int getPlusMinus() {
        return this.plusMinus;
    }

    public void setPlusMinus(int plusMinus) {
        this.plusMinus = plusMinus;
    }

    public int getShots() {
        return this.shots;
    }

    public void setShots(int shots) {
        this.shots = shots;
    }

    public int getGoodPasses() {
        return this.goodPasses;
    }

    public void setGoodPasses(int goodPasses) {
        this.goodPasses = goodPasses;
    }

    public int getBadPasses() {
        return this.badPasses;
    }

    public void setBadPasses(int badPasses) {
        this.badPasses = badPasses;
    }

    public int getRecoveredPucks() {
        return this.recoveredPucks;
    }

    public void setRecoveredPucks(int recoveredPucks) {
        this.recoveredPucks = recoveredPucks;
    }

    public int getLostPucks() {
        return this.lostPucks;
    }

    public void setLostPucks(int lostPucks) {
        this.lostPucks = lostPucks;
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

    public int getPenaltyShotMisses() {
        return this.penaltyShotMisses;
    }

    public void setPenaltyShotMisses(int penaltyShotMisses) {
        this.penaltyShotMisses = penaltyShotMisses;
    }

    public PlayerStatsDTO toDTO() {
        PlayerStatsDTO playerStatsDTO = new PlayerStatsDTO(this.id, this.player.toDTOWithoutStats(), this.gamesPlayed,
                this.goals, this.assists, this.plusMinus, this.shots, this.goodPasses, this.badPasses,
                this.recoveredPucks, this.lostPucks, this.penaltyMins, this.penaltyShotGoals, this.penaltyShotMisses);

        return playerStatsDTO;
    }

    public PlayerStatsDTO toDTOWithoutPlayer() {
        PlayerStatsDTO playerStatsDTO = new PlayerStatsDTO(this.id, this.gamesPlayed,
                this.goals, this.assists, this.plusMinus, this.shots, this.goodPasses, this.badPasses,
                this.recoveredPucks, this.lostPucks, this.penaltyMins, this.penaltyShotGoals, this.penaltyShotMisses);

        return playerStatsDTO;
    }

}
