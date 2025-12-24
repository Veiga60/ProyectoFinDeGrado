package com.ikerveiga.app.DTO;

import java.util.List;

import com.ikerveiga.app.PlayerType;

public class PlayerDTO {

    private long id;
    private String name;
    private String lastName1;
    private String lastName2;
    private String photo;
    private PlayerType playerType;
    private List<MatchDTO> matches;
    private PlayerStatsDTO playerStats;
    private GoalieStatsDTO goalieStats;

    public PlayerDTO(String name, String lastName1, String lastName2, String photo, PlayerType playerType,
            List<MatchDTO> matches,
            PlayerStatsDTO playerStats) {
        this.name = name;
        this.lastName1 = lastName1;
        this.lastName2 = lastName2;
        this.photo = photo;
        this.playerType = playerType;
        this.matches = matches;
        this.playerStats = playerStats;
    }

    public PlayerDTO(String name, String lastName1, String lastName2, String photo, PlayerType playerType,
            List<MatchDTO> matches,
            GoalieStatsDTO goalieStats) {
        this.name = name;
        this.lastName1 = lastName1;
        this.lastName2 = lastName2;
        this.photo = photo;
        this.playerType = playerType;
        this.matches = matches;
        this.goalieStats = goalieStats;
    }

    public PlayerDTO(long id, String name, String lastName1, String lastName2, String photo, PlayerType playerType,
            List<MatchDTO> matches,
            PlayerStatsDTO playerStats) {
        this.id = id;
        this.name = name;
        this.lastName1 = lastName1;
        this.lastName2 = lastName2;
        this.photo = photo;
        this.playerType = playerType;
        this.matches = matches;
        this.playerStats = playerStats;
    }

    public PlayerDTO(long id, String name, String lastName1, String lastName2, String photo, PlayerType playerType,
            List<MatchDTO> matches,
            GoalieStatsDTO goalieStats) {
        this.id = id;
        this.name = name;
        this.lastName1 = lastName1;
        this.lastName2 = lastName2;
        this.photo = photo;
        this.playerType = playerType;
        this.matches = matches;
        this.goalieStats = goalieStats;
    }

    public PlayerDTO(long id, String name, String lastName1, String lastName2, String photo, PlayerType playerType,
            List<MatchDTO> matches) {
        this.name = name;
        this.lastName1 = lastName1;
        this.lastName2 = lastName2;
        this.photo = photo;
        this.playerType = playerType;
        this.matches = matches;
    }

    public long getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName1() {
        return this.lastName1;
    }

    public void setLastName1(String lastName1) {
        this.lastName1 = lastName1;
    }

    public String getLastName2() {
        return this.lastName2;
    }

    public void setLastName2(String lastName2) {
        this.lastName2 = lastName2;
    }

    public String getPhoto() {
        return this.photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public PlayerType getPlayerType() {
        return this.playerType;
    }

    public List<MatchDTO> getMatches() {
        return this.matches;
    }

    public void setMatches(List<MatchDTO> matches) {
        this.matches = matches;
    }

    public PlayerStatsDTO getPlayerStats() {
        return this.playerStats;
    }

    public void setStatsDTO(PlayerStatsDTO playerStats) {
        this.playerStats = playerStats;
    }

    public GoalieStatsDTO getGoalieStats() {
        return this.goalieStats;
    }

    public void setGoalieStatsDTO(GoalieStatsDTO goalieStats) {
        this.goalieStats = goalieStats;
    }
}
