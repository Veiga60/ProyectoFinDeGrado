package com.ikerveiga.app.dto;

public class TeamStatsDTO {

    private long id;
    private int points;
    private int gamesPlayed;
    private int gamesWon;
    private int gamesLost;
    private int gamesTied;
    private int bonusPoints;
    private int goalsFor;
    private int goalsAgainst;
    private float powerPlayPercentage;
    private float penaltyKillPercentage;
    private int oneVsZero;
    private int oneVsOne;
    private int twoVsOne;
    private int twoVsTwo;
    private int threeVsOne;
    private int threeVsTwo;
    private ClubTeamDTO clubTeam;

    public TeamStatsDTO() {

    }

    public TeamStatsDTO(long id, int points, int gamesPlayed, int gamesWon, int gamesLost, int gamesTied,
            int bonusPoints,
            int goalsFor, int goalsAgainst, float powerPlayPercentage, float penaltyKillPercentage, int oneVsZero,
            int oneVsOne,
            int twoVsOne, int twoVsTwo, int threeVsOne, int threeVsTwo, ClubTeamDTO clubTeam) {
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
        this.clubTeam = clubTeam;
    }

    public TeamStatsDTO(int points, int gamesPlayed, int gamesWon, int gamesLost, int gamesTied, int bonusPoints,
            int goalsFor, int goalsAgainst, float powerPlayPercentage, float penaltyKillPercentage, int oneVsZero,
            int oneVsOne,
            int twoVsOne, int twoVsTwo, int threeVsOne, int threeVsTwo, ClubTeamDTO clubTeam) {
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
        this.clubTeam = clubTeam;
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

    public void setPowerPlayPercentage(int powerPlayPercentage) {
        this.powerPlayPercentage = powerPlayPercentage;
    }

    public float getPenaltyKillPercentage() {
        return this.penaltyKillPercentage;
    }

    public void setPenaltyKillPercentage(int penaltyKillPercentage) {
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

    public ClubTeamDTO getClubTeam() {
        return this.clubTeam;
    }

    public void setClubTeam(ClubTeamDTO clubTeam) {
        this.clubTeam = clubTeam;
    }
}
