package com.ikerveiga.app.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.ikerveiga.app.dto.MatchDTO;
import com.ikerveiga.app.dto.PlayerDTO;
import com.ikerveiga.app.enums.PlayerType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
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

    @ManyToMany
    @JoinTable(name = "player_match", joinColumns = @JoinColumn(name = "player_id"), inverseJoinColumns = @JoinColumn(name = "match_id"))
    private List<Match> matches;

    @OneToOne(mappedBy = "player")
    private PlayerStats playerStats;

    @OneToOne(mappedBy = "goalie")
    private GoalieStats goalieStats;

    @OneToOne(mappedBy = "player")
    private User user;

    public Player() {

    }

    public Player(String name, String lastName1, String lastName2, LocalDate birthDate, int number, String photo,
            PlayerType playerType,
            List<Match> matches,
            PlayerStats playerStats) {
        this.name = name;
        this.lastName1 = lastName1;
        this.lastName2 = lastName2;
        this.birthDate = birthDate;
        this.number = number;
        this.photo = photo;
        this.playerType = playerType;
        this.matches = matches;
        this.playerStats = playerStats;
    }

    public Player(String name, String lastName1, String lastName2, LocalDate birthDate, int number, String photo,
            PlayerType playerType,
            List<Match> matches,
            GoalieStats goalieStats) {
        this.name = name;
        this.lastName1 = lastName1;
        this.lastName2 = lastName2;
        this.birthDate = birthDate;
        this.number = number;
        this.photo = photo;
        this.playerType = playerType;
        this.matches = matches;
        this.goalieStats = goalieStats;
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

    public List<Match> getMatches() {
        return this.matches;
    }

    public void setMatches(List<Match> matches) {
        this.matches = matches;
    }

    public PlayerStats getStats() {
        return this.playerStats;
    }

    public void setPlayerStats(PlayerStats playerStats) {
        this.playerStats = playerStats;
    }

    public PlayerDTO toDTO() {
        List<MatchDTO> matchesDTO = new ArrayList<>();
        for (Match match : this.matches) {
            matchesDTO.add(match.toDTO());
        }

        PlayerDTO playerDTO;
        if (this.playerType.equals(PlayerType.RINK_PLAYER)) {
            playerDTO = new PlayerDTO(this.id, this.name, this.lastName1, this.lastName2, this.birthDate, this.number,
                    this.photo, this.playerType,
                    matchesDTO,
                    this.playerStats.toDTOWithoutPlayer());
        } else {
            playerDTO = new PlayerDTO(this.id, this.name, this.lastName1, this.lastName2, this.birthDate, this.number,
                    this.photo, this.playerType,
                    matchesDTO,
                    this.goalieStats.toDTOWithoutGoalie());
        }

        return playerDTO;
    }

    public PlayerDTO toDTOWithoutStats() {
        List<MatchDTO> matchesDTO = new ArrayList<>();
        for (Match match : this.matches) {
            matchesDTO.add(match.toDTO());
        }

        PlayerDTO playerDTO = new PlayerDTO(this.id, this.name, this.lastName1, this.lastName2, this.birthDate,
                this.number, this.photo,
                this.playerType, matchesDTO);

        return playerDTO;
    }
}