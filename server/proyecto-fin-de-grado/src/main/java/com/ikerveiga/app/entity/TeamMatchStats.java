package com.ikerveiga.app.entity;

import com.ikerveiga.app.dto.TeamMatchStatsDTO;

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
@Table(name = "team_match_stats")
public class TeamMatchStats {

    @Id
    @Column(name = "match_stats_id", nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "match_id", referencedColumnName = "match_id")
    private Match match;

    @Column(name = "power_play_goals", nullable = false, unique = false)
    private int powerPlayGoals;

    @Column(name = "power_play_no_goals", nullable = false, unique = false)
    private int powerPlayNoGoals;

    @Column(name = "penalty_kill_goals", nullable = false, unique = false)
    private int penaltyKillGoals;

    @Column(name = "penalty_kill_no_goals", nullable = false, unique = false)
    private int penaltyKillNoGoals;

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

    public TeamMatchStats() {

    }

    public TeamMatchStats(long id, Match match, int powerPlayGoals, int powerPlayNoGoals, int penaltyKillGoals,
            int penaltyKillNoGoals, int oneVsZero, int oneVsOne, int twoVsOne, int twoVsTwo, int threeVsOne,
            int threeVsTwo) {
        this.id = id;
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

    public TeamMatchStats(Match match, int powerPlayGoals, int powerPlayNoGoals, int penaltyKillGoals,
            int penaltyKillNoGoals, int oneVsZero, int oneVsOne, int twoVsOne, int twoVsTwo, int threeVsOne,
            int threeVsTwo) {
        this.match = match;
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

    public Match getMatch() {
        return this.match;
    }

    public void setMatch(Match match) {
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

    public TeamMatchStatsDTO toDTO() {
        TeamMatchStatsDTO teamMatchStatsDTO = new TeamMatchStatsDTO(this.id, this.match.toDTO(), this.powerPlayGoals,
                this.powerPlayNoGoals, this.penaltyKillGoals, this.penaltyKillNoGoals, this.oneVsZero, this.oneVsOne,
                this.twoVsOne, this.twoVsTwo, this.threeVsOne, this.threeVsTwo);

        return teamMatchStatsDTO;
    }
}
