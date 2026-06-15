package com.ikerveiga.app.dto;

public class PlayerMatchStatsDTO {

    private long id;
    private PlayerDTO player;
    private MatchDTO match;
    private int goals;
    private int assists;
    private int plusMinus;
    private int shots;
    private int goodPasses;
    private int badPasses;
    private int recoveredPucks;
    private int lostPucks;
    private int penaltyMins;
    private int penaltyShotGoals;
    private int penaltyShotMisses;

    public PlayerMatchStatsDTO(long id, PlayerDTO player, MatchDTO match, int goals, int assists, int plusMinus,
            int shots,
            int goodPasses, int badPasses, int recoveredPucks, int lostPucks, int penaltyMins, int penaltyShotGoals,
            int penaltyShotMisses) {
        this.id = id;
        this.player = player;
        this.match = match;
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

    public PlayerMatchStatsDTO() {

    }

    public PlayerMatchStatsDTO(int goals, int assists, int plusMinus,
            int shots,
            int goodPasses, int badPasses, int recoveredPucks, int lostPucks, int penaltyMins, int penaltyShotGoals,
            int penaltyShotMisses) {
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

    public long getId() {
        return this.id;
    }

    public PlayerDTO getPlayer() {
        return this.player;
    }

    public void setPlayer(PlayerDTO player) {
        this.player = player;
    }

    public MatchDTO getMatch() {
        return this.match;
    }

    public void setMatch(MatchDTO match) {
        this.match = match;
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
}
