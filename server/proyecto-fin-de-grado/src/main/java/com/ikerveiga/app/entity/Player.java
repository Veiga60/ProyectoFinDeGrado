package com.ikerveiga.app.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.ikerveiga.app.dto.CallDTO;
import com.ikerveiga.app.dto.ClubTeamDTO;
import com.ikerveiga.app.dto.GoalieStatsDTO;
import com.ikerveiga.app.dto.PlayerDTO;
import com.ikerveiga.app.dto.PlayerStatsDTO;
import com.ikerveiga.app.enums.PlayerType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Players")
public class Player {

    @Id
    @Column(name = "player_id", nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "player_name", nullable = false, unique = false)
    private String name;

    @Column(name = "player_lastName1", nullable = false, unique = false)
    private String lastName1;

    @Column(name = "player_lastName2", nullable = false, unique = false)
    private String lastName2;

    @Column(name = "player_birth_date", nullable = false, unique = false)
    private LocalDate birthDate;

    @Column(name = "player_number", nullable = false, unique = false)
    private int number;

    @Column(name = "player_photo", nullable = true, unique = false)
    private String photo;

    @Enumerated(EnumType.STRING)
    @Column(name = "player_type", nullable = false, unique = false)
    private PlayerType playerType;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "player_call", joinColumns = @JoinColumn(name = "player_id"), inverseJoinColumns = @JoinColumn(name = "call_id"))
    private List<Call> calls;

    @OneToMany(mappedBy = "player")
    private List<PlayerStats> playerStats;

    @OneToMany(mappedBy = "goalie")
    private List<GoalieStats> goalieStats;

    @OneToOne(mappedBy = "player")
    private User user;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "player_club_team", joinColumns = @JoinColumn(name = "player_id"), inverseJoinColumns = @JoinColumn(name = "club_team_id"))
    List<ClubTeam> clubTeams;

    public Player() {

    }

    public Player(String name, String lastName1, String lastName2, LocalDate birthDate, int number, String photo,
            PlayerType playerType,
            List<Call> calls,
            List<PlayerStats> playerStats,
            List<GoalieStats> goalieStats,
            List<ClubTeam> clubTeams) {
        this.name = name;
        this.lastName1 = lastName1;
        this.lastName2 = lastName2;
        this.birthDate = birthDate;
        this.number = number;
        this.photo = photo;
        this.playerType = playerType;
        this.calls = calls;
        this.playerStats = playerStats;
        this.goalieStats = goalieStats;
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

    public String getPhoto() {
        return this.photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public PlayerType getPlayerType() {
        return this.playerType;
    }

    public List<Call> getCalls() {
        return this.calls;
    }

    public void setCalls(List<Call> calls) {
        this.calls = calls;
    }

    public List<PlayerStats> getStats() {
        return this.playerStats;
    }

    public void setPlayerStats(List<PlayerStats> playerStats) {
        this.playerStats = playerStats;
    }

    public List<GoalieStats> getGoalieStats() {
        return this.goalieStats;
    }

    public void setGoalieStats(List<GoalieStats> goalieStats) {
        this.goalieStats = goalieStats;
    }

    public List<ClubTeam> getClubTeams() {
        return this.clubTeams;
    }

    public void setClubTeams(List<ClubTeam> clubTeams) {
        this.clubTeams = clubTeams;
    }

    public PlayerDTO toDTO() {
        List<CallDTO> callsDTO = new ArrayList<>();
        List<ClubTeamDTO> clubTeamsDTO = new ArrayList<>();

        for (Call call : this.calls) {
            callsDTO.add(call.toDTO());
        }

        for (ClubTeam clubTeam : clubTeams) {
            clubTeamsDTO.add(clubTeam.toDTO());
        }

        PlayerDTO playerDTO;
        if (this.playerType.equals(PlayerType.RINK_PLAYER)) {
            List<PlayerStatsDTO> playerStatsDTO = new ArrayList<>();

            for (PlayerStats playerStats : this.playerStats) {
                playerStatsDTO.add(playerStats.toDTOWithoutPlayer());
            }

            playerDTO = new PlayerDTO(this.id, this.name, this.lastName1, this.lastName2, this.birthDate, this.number,
                    this.photo, this.playerType,
                    callsDTO,
                    playerStatsDTO, null, clubTeamsDTO);
        } else {

            List<GoalieStatsDTO> goalieStatsDTO = new ArrayList<>();
            for (GoalieStats playerStats : this.goalieStats) {
                goalieStatsDTO.add(playerStats.toDTOWithoutGoalie());
            }

            playerDTO = new PlayerDTO(this.id, this.name, this.lastName1, this.lastName2, this.birthDate, this.number,
                    this.photo, this.playerType,
                    callsDTO, null,
                    goalieStatsDTO, clubTeamsDTO);
        }

        return playerDTO;
    }

    public PlayerDTO toDTOWithoutStats() {
        List<CallDTO> callsDTO = new ArrayList<>();
        List<ClubTeamDTO> clubTeamsDTO = new ArrayList<>();

        for (Call call : this.calls) {
            callsDTO.add(call.toDTO());
        }

        for (ClubTeam clubTeam : clubTeams) {
            clubTeamsDTO.add(clubTeam.toDTO());
        }

        PlayerDTO playerDTO = new PlayerDTO(this.id, this.name, this.lastName1, this.lastName2, this.birthDate,
                this.number, this.photo,
                this.playerType, callsDTO, clubTeamsDTO);

        return playerDTO;
    }

    public PlayerDTO toDTOWithoutStatsAndCalls() {
        List<ClubTeamDTO> clubTeamsDTO = new ArrayList<>();

        for (ClubTeam clubTeam : clubTeams) {
            clubTeamsDTO.add(clubTeam.toDTO());
        }

        PlayerDTO playerDTO = new PlayerDTO(this.id, this.name, this.lastName1, this.lastName2, this.birthDate,
                this.number, this.photo, this.playerType, clubTeamsDTO);

        return playerDTO;
    }
}