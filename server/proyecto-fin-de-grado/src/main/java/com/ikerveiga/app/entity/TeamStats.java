package com.ikerveiga.app.entity;

import com.ikerveiga.app.dto.TeamStatsDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "team_stats")
public class TeamStats {

    @Id
    @Column(name = "team_stats_id", nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "points", nullable = false, unique = false)
    private int points;

    @Column(name = "games_played", nullable = false, unique = false)
    private int gamesPlayed;

    @Column(name = "games_won", nullable = false, unique = false)
    private int gamesWon;

    @Column(name = "games_lost", nullable = false, unique = false)
    private int gamesLost;

    @Column(name = "games_tied", nullable = false, unique = false)
    private int gamesTied;

    @Column(name = "bonus_points", nullable = false, unique = false)
    private int bonusPoints;

    @Column(name = "goals_for", nullable = false, unique = false)
    private int goalsFor;

    @Column(name = "goals_against", nullable = false, unique = false)
    private int goalsAgainst;

    @Column(name = "pp_percentage", nullable = false, unique = false)
    private float powerPlayPercentage;

    @Column(name = "pk_percentage", nullable = false, unique = false)
    private float penaltyKillPercentage;

    @Column(name = "one_vs_zero", nullable = false, unique = false)
    private int oneVsZero;

    @Column(name = "one_vs_one", nullable = false, unique = false)
    private int oneVsOne;

    @Column(name = "two_vs_one", nullable = false, unique = false)
    private int twoVsOne;

    @Column(name = "two_vs_two", nullable = false, unique = false)
    private int twoVsTwo;

    @Column(name = "three_vs_one", nullable = false, unique = false)
    private int threeVsOne;

    @Column(name = "three_vs_two", nullable = false, unique = false)
    private int threeVsTwo;

    public TeamStats() {

    }

    public TeamStats(long id, int points, int gamesPlayed, int gamesWon, int gamesLost, int gamesTied, int bonusPoints,
            int goalsFor, int goalsAgainst, float powerPlayPercentage, float penaltyKillPercentage, int oneVsZero,
            int oneVsOne,
            int twoVsOne, int twoVsTwo, int threeVsOne, int threeVsTwo) {
        this.id = id;
        this.points = points;
        this.gamesPlayed = gamesPlayed;
        this.gamesWon = gamesWon;
        this.gamesLost = gamesLost;
        this.gamesTied = gamesTied;
        this.bonusPoints = bonusPoints;
        this.goalsFor = goalsFor;
        this.goalsAgainst = goalsAgainst;
        this.powerPlayPercentage = powerPlayPercentage;
        this.penaltyKillPercentage = penaltyKillPercentage;
        this.oneVsZero = oneVsZero;
        this.oneVsOne = oneVsOne;
        this.twoVsOne = twoVsOne;
        this.twoVsTwo = twoVsTwo;
        this.threeVsOne = threeVsOne;
        this.threeVsTwo = threeVsTwo;
    }

    public TeamStats(int points, int gamesPlayed, int gamesWon, int gamesLost, int gamesTied, int bonusPoints,
            int goalsFor, int goalsAgainst, float powerPlayPercentage, float penaltyKillPercentage, int oneVsZero,
            int oneVsOne,
            int twoVsOne, int twoVsTwo, int threeVsOne, int threeVsTwo) {
        this.points = points;
        this.gamesPlayed = gamesPlayed;
        this.gamesWon = gamesWon;
        this.gamesLost = gamesLost;
        this.gamesTied = gamesTied;
        this.bonusPoints = bonusPoints;
        this.goalsFor = goalsFor;
        this.goalsAgainst = goalsAgainst;
        this.powerPlayPercentage = powerPlayPercentage;
        this.penaltyKillPercentage = penaltyKillPercentage;
        this.oneVsZero = oneVsZero;
        this.oneVsOne = oneVsOne;
        this.twoVsOne = twoVsOne;
        this.twoVsTwo = twoVsTwo;
        this.threeVsOne = threeVsOne;
        this.threeVsTwo = threeVsTwo;
    }

    public long getId() {
        return this.id;
    }

    public int getPoints() {
        return this.points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public int getGamesPlayed() {
        return this.gamesPlayed;
    }

    public void setGamesPlayed(int gamesPlayed) {
        this.gamesPlayed = gamesPlayed;
    }

    public int getGamesWon() {
        return this.gamesWon;
    }

    public void setGamesWon(int gamesWon) {
        this.gamesWon = gamesWon;
    }

    public int getGamesLost() {
        return this.gamesLost;
    }

    public void setGamesLost(int gamesLost) {
        this.gamesLost = gamesLost;
    }

    public int getGamesTied() {
        return this.gamesTied;
    }

    public void setGamesTied(int gamesTied) {
        this.gamesTied = gamesTied;
    }

    public int getBonusPoints() {
        return this.bonusPoints;
    }

    public void setBonusPoints(int bonusPoints) {
        this.bonusPoints = bonusPoints;
    }

    public int getGoalsFor() {
        return this.goalsFor;
    }

    public void setGoalsFor(int goalsFor) {
        this.goalsFor = goalsFor;
    }

    public int getGoalsAgainst() {
        return this.goalsAgainst;
    }

    public void setGoalsAgainst(int goalsAgainst) {
        this.goalsAgainst = goalsAgainst;
    }

    public float getPowerPlayPercentage() {
        return this.powerPlayPercentage;
    }

    public void setPowerPlayPercentage(float powerPlayPercentage) {
        this.powerPlayPercentage = powerPlayPercentage;
    }

    public float getPenaltyKillPercentage() {
        return this.penaltyKillPercentage;
    }

    public void setPenaltyKillPercentage(float penaltyKillPercentage) {
        this.penaltyKillPercentage = penaltyKillPercentage;
    }

    public int getOneVsZero() {
        return this.oneVsZero;
    }

    public void setOneVsZero(int oneVsZero) {
        this.oneVsZero = oneVsZero;
    }

    public int getOneVsOne() {
        return this.oneVsOne;
    }

    public void setOneVsOne(int oneVsOne) {
        this.oneVsOne = oneVsOne;
    }

    public int getTwoVsOne() {
        return this.twoVsOne;
    }

    public void setTwoVsOne(int twoVsOne) {
        this.twoVsOne = twoVsOne;
    }

    public int getTwoVsTwo() {
        return this.twoVsTwo;
    }

    public void setTwoVsTwo(int twoVsTwo) {
        this.twoVsTwo = twoVsTwo;
    }

    public int getThreeVsOne() {
        return this.threeVsOne;
    }

    public void setThreeVsOne(int threeVsOne) {
        this.threeVsOne = threeVsOne;
    }

    public int getThreeVsTwo() {
        return this.threeVsTwo;
    }

    public void setThreeVsTwo(int threeVsTwo) {
        this.threeVsTwo = threeVsTwo;
    }

    public TeamStatsDTO toDTO() {
        TeamStatsDTO teamStatsDTO = new TeamStatsDTO(this.id, this.points, this.gamesPlayed, this.gamesWon,
                this.gamesLost,
                this.gamesTied, this.bonusPoints, this.goalsFor, this.goalsAgainst, this.powerPlayPercentage,
                this.penaltyKillPercentage, this.oneVsZero, this.oneVsOne, this.twoVsOne, this.twoVsTwo,
                this.threeVsOne, this.threeVsTwo);

        return teamStatsDTO;
    }
}
