package com.ikerveiga.app.dto;

import com.ikerveiga.app.enums.MatchResult;

public class TeamMatchStatsDTO {

    private long id;
    private MatchDTO match;
    private MatchResult matchResult;
    private boolean bonusPoint;
    private int goalsFor;
    private int goalsAgainst;
    private int powerPlayGoals;
    private int powerPlayNoGoals;
    private int penaltyKillGoals;
    private int penaltyKillNoGoals;
    private int oneVsZero;
    private int oneVsOne;
    private int twoVsOne;
    private int twoVsTwo;
    private int threeVsOne;
    private int threeVsTwo;

    public TeamMatchStatsDTO() {

    }

    public TeamMatchStatsDTO(long id, MatchResult matchResult, boolean bonusPoint, int goalsFor, int goalsAgainst,
            MatchDTO match, int powerPlayGoals, int powerPlayNoGoals, int penaltyKillGoals,
            int penaltyKillNoGoals, int oneVsZero, int oneVsOne, int twoVsOne, int twoVsTwo, int threeVsOne,
            int threeVsTwo) {
        this.id = id;
        this.match = match;
        this.matchResult = matchResult;
        this.bonusPoint = bonusPoint;
        this.goalsFor = goalsFor;
        this.goalsAgainst = goalsAgainst;
        this.powerPlayGoals = powerPlayGoals;
        this.powerPlayNoGoals = powerPlayNoGoals;
        this.penaltyKillGoals = penaltyKillNoGoals;
        this.oneVsZero = oneVsZero;
        this.oneVsOne = oneVsOne;
        this.twoVsOne = twoVsOne;
        this.twoVsTwo = twoVsTwo;
        this.threeVsOne = threeVsOne;
        this.threeVsTwo = threeVsTwo;
    }

    public TeamMatchStatsDTO(MatchResult matchResult, boolean bonusPoint, int goalsFor, int goalsAgainst,
            MatchDTO match, int powerPlayGoals, int powerPlayNoGoals, int penaltyKillGoals,
            int penaltyKillNoGoals, int oneVsZero, int oneVsOne, int twoVsOne, int twoVsTwo, int threeVsOne,
            int threeVsTwo) {
        this.match = match;
        this.matchResult = matchResult;
        this.bonusPoint = bonusPoint;
        this.goalsFor = goalsFor;
        this.goalsAgainst = goalsAgainst;
        this.powerPlayGoals = powerPlayGoals;
        this.powerPlayNoGoals = powerPlayNoGoals;
        this.penaltyKillGoals = penaltyKillNoGoals;
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

    public MatchResult getMatchResult() {
        return this.matchResult;
    }

    public void setMatchResult(MatchResult matchResult) {
        this.matchResult = matchResult;
    }

    public boolean getBonusPoint() {
        return this.bonusPoint;
    }

    public void setBonusPoint(boolean bonusPoint) {
        this.bonusPoint = bonusPoint;
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

    public MatchDTO getMatch() {
        return this.match;
    }

    public void setMatch(MatchDTO match) {
        this.match = match;
    }

    public int getPowerPlayGoals() {
        return this.powerPlayGoals;
    }

    public void setPowerPlayGoals(int powerPlayGoals) {
        this.powerPlayGoals = powerPlayGoals;
    }

    public int getPowerPlayNoGoals() {
        return this.powerPlayNoGoals;
    }

    public void setPowerPlayNoGoals(int powerPlayNoGoals) {
        this.powerPlayNoGoals = powerPlayNoGoals;
    }

    public int getPenaltyKillGoals() {
        return this.penaltyKillGoals;
    }

    public void setPenaltyKillGoals(int penaltyKillGoals) {
        this.penaltyKillGoals = penaltyKillGoals;
    }

    public int getPenaltyKillNoGoals() {
        return this.penaltyKillNoGoals;
    }

    public void setPenaltyKillNoGoals(int penaltyKillNoGoals) {
        this.penaltyKillNoGoals = penaltyKillNoGoals;
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
}
