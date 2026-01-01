package com.ikerveiga.app.dto;

public class GoalieStatsDTO {

    private long id;
    private PlayerDTO goalie;
    private int gamesPlayed;
    private int shotsReceived;
    private int goalsReceived;
    private int penaltyMins;
    private int penaltyShotGoals;
    private int penaltyShotSaves;

    public GoalieStatsDTO(long id, PlayerDTO goalie, int gamesPlayed, int shotsReceived, int goalsReceived,
            int penaltyMins, int penaltyShotGoals, int penaltyShotSaves) {
        this.id = id;
        this.goalie = goalie;
        this.gamesPlayed = gamesPlayed;
        this.shotsReceived = shotsReceived;
        this.goalsReceived = goalsReceived;
        this.penaltyMins = penaltyMins;
        this.penaltyShotGoals = penaltyShotGoals;
        this.penaltyShotSaves = penaltyShotSaves;
    }

    public GoalieStatsDTO(long id, int gamesPlayed, int shotsReceived, int goalsReceived,
            int penaltyMins, int penaltyShotGoals, int penaltyShotSaves) {
        this.id = id;
        this.gamesPlayed = gamesPlayed;
        this.shotsReceived = shotsReceived;
        this.goalsReceived = goalsReceived;
        this.penaltyMins = penaltyMins;
        this.penaltyShotGoals = penaltyShotGoals;
        this.penaltyShotSaves = penaltyShotSaves;
    }

    public long getId() {
        return this.id;
    }

    public PlayerDTO getGoalie() {
        return this.goalie;
    }

    public void setGoalie(PlayerDTO goalie) {
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

}
