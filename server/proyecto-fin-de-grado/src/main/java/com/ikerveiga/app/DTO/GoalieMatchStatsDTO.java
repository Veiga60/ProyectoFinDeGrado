package com.ikerveiga.app.DTO;

public class GoalieMatchStatsDTO {

    private long id;
    private PlayerDTO goalie;
    private MatchDTO match;
    private int shotsReceived;
    private int goalsReceived;
    private int penaltyMins;
    private int penaltyShotGoals;
    private int penaltyShotSaves;

    public GoalieMatchStatsDTO() {

    }

    public GoalieMatchStatsDTO(long id, PlayerDTO goalie, MatchDTO match, int shotsReceived, int goalsReceived,
            int penaltyMins,
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

    public GoalieMatchStatsDTO(int shotsReceived, int goalsReceived,
            int penaltyMins,
            int penaltyShotGoals, int penaltyShotSaves) {
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

    public MatchDTO getMatch() {
        return this.match;
    }

    public void setMatch(MatchDTO match) {
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
}
