package com.ikerveiga.app.DTO;

public class PlayerStatsDTO {

    private long id;
    private PlayerDTO player;
    private int gamesPlayed;
    private int points;
    private int goals;
    private int assists;
    private int plusMinus;
    private int shots;
    private int goodPasses;
    private int badPasses;
    private int recoveredPucks;
    private int penaltyMins;
    private int penaltyShotGoals;
    private int penaltyShotMisses;

    public PlayerStatsDTO(long id, PlayerDTO player, int gamesPlayed, int points, int goals, int assists, int plusMinus,
            int shots,
            int goodPasses,
            int badPasses, int recoveredPucks, int penaltyMins, int penaltyShotGoals, int penaltyShotMisses) {
        this.id = id;
        this.player = player;
        this.gamesPlayed = gamesPlayed;
        this.points = points;
        this.goals = goals;
        this.assists = assists;
        this.plusMinus = plusMinus;
        this.shots = shots;
        this.goodPasses = goodPasses;
        this.badPasses = badPasses;
        this.recoveredPucks = recoveredPucks;
        this.penaltyMins = penaltyMins;
        this.penaltyShotGoals = penaltyShotGoals;
        this.penaltyShotMisses = penaltyShotMisses;
    }

    public long getId() {
        return this.id;
    }

    public PlayerDTO getPlayer() {
        return this.player;
    }

    public void setPlayer(PlayerDTO player) {
        this.player = player;
    }

    public int getGamesPlayed() {
        return this.gamesPlayed;
    }

    public void setGamesPlayed(int gamesPlayed) {
        this.gamesPlayed = gamesPlayed;
    }

    public int getPoints() {
        return this.points;
    }

    public void setPoints(int points) {
        this.points = points;
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
}
