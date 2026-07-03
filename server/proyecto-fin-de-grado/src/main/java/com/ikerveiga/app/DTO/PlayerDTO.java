package com.ikerveiga.app.dto;

import java.time.LocalDate;
import java.util.List;

import com.ikerveiga.app.enums.PlayerType;

public class PlayerDTO {

    private long id;
    private String name;
    private String lastName1;
    private String lastName2;
    private LocalDate birthDate;
    private int number;
    private String photo;
    private PlayerType playerType;
    private List<CallDTO> calls;
    private PlayerStatsDTO playerStats;
    private GoalieStatsDTO goalieStats;
    private List<ClubTeamDTO> clubTeams;

    public PlayerDTO() {

    }

    public PlayerDTO(String name, String lastName1, String lastName2, LocalDate birthDate, int number, String photo,
            PlayerType playerType,
            List<CallDTO> calls,
            PlayerStatsDTO playerStats,
            List<ClubTeamDTO> clubTeams) {
        this.name = name;
        this.lastName1 = lastName1;
        this.lastName2 = lastName2;
        this.photo = photo;
        this.birthDate = birthDate;
        this.number = number;
        this.playerType = playerType;
        this.calls = calls;
        this.playerStats = playerStats;
        this.clubTeams = clubTeams;
    }

    public PlayerDTO(String name, String lastName1, String lastName2, LocalDate birthDate, int number, String photo,
            PlayerType playerType,
            List<CallDTO> calls,
            GoalieStatsDTO goalieStats,
            List<ClubTeamDTO> clubTeams) {
        this.name = name;
        this.lastName1 = lastName1;
        this.lastName2 = lastName2;
        this.birthDate = birthDate;
        this.number = number;
        this.photo = photo;
        this.playerType = playerType;
        this.calls = calls;
        this.goalieStats = goalieStats;
        this.clubTeams = clubTeams;
    }

    public PlayerDTO(long id, String name, String lastName1, String lastName2, LocalDate birthDate, int number,
            String photo, PlayerType playerType,
            List<CallDTO> calls,
            PlayerStatsDTO playerStats,
            List<ClubTeamDTO> clubTeams) {
        this.id = id;
        this.name = name;
        this.lastName1 = lastName1;
        this.lastName2 = lastName2;
        this.birthDate = birthDate;
        this.number = number;
        this.photo = photo;
        this.playerType = playerType;
        this.calls = calls;
        this.playerStats = playerStats;
        this.clubTeams = clubTeams;
    }

    public PlayerDTO(long id, String name, String lastName1, String lastName2, LocalDate birthDate, int number,
            String photo, PlayerType playerType,
            List<CallDTO> calls,
            GoalieStatsDTO goalieStats,
            List<ClubTeamDTO> clubTeams) {
        this.id = id;
        this.name = name;
        this.lastName1 = lastName1;
        this.lastName2 = lastName2;
        this.birthDate = birthDate;
        this.number = number;
        this.photo = photo;
        this.playerType = playerType;
        this.calls = calls;
        this.goalieStats = goalieStats;
        this.clubTeams = clubTeams;
    }

    public PlayerDTO(long id, String name, String lastName1, String lastName2, LocalDate birthDate, int number,
            String photo, PlayerType playerType,
            List<CallDTO> calls,
            List<ClubTeamDTO> clubTeams) {
        this.id = id;
        this.name = name;
        this.lastName1 = lastName1;
        this.lastName2 = lastName2;
        this.birthDate = birthDate;
        this.number = number;
        this.photo = photo;
        this.playerType = playerType;
        this.calls = calls;
        this.clubTeams = clubTeams;
    }

    public PlayerDTO(long id, String name, String lastName1, String lastName2, LocalDate birthDate, int number,
            String photo, PlayerType playerType, List<ClubTeamDTO> clubTeams) {
        this.id = id;
        this.name = name;
        this.lastName1 = lastName1;
        this.lastName2 = lastName2;
        this.birthDate = birthDate;
        this.number = number;
        this.photo = photo;
        this.playerType = playerType;
        this.clubTeams = clubTeams;
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

    public LocalDate getBirthDate() {
        return this.birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public int getNumber() {
        return this.number;
    }

    public void setNumber(int number) {
        this.number = number;
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

    public List<CallDTO> getCalls() {
        return this.calls;
    }

    public void setCalls(List<CallDTO> calls) {
        this.calls = calls;
    }

    public PlayerStatsDTO getPlayerStats() {
        return this.playerStats;
    }

    public void setPlayerStatsDTO(PlayerStatsDTO playerStats) {
        this.playerStats = playerStats;
    }

    public GoalieStatsDTO getGoalieStats() {
        return this.goalieStats;
    }

    public void setGoalieStatsDTO(GoalieStatsDTO goalieStats) {
        this.goalieStats = goalieStats;
    }

    public List<ClubTeamDTO> getClubTeams() {
        return this.clubTeams;
    }

    public void setClubTeams(List<ClubTeamDTO> clubTeams) {
        this.clubTeams = clubTeams;
    }
}
