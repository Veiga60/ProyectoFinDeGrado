package com.ikerveiga.app.entity;

import com.ikerveiga.app.dto.PlayerRecomendationDTO;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "player_recomendations")
public class PlayerRecomendation {

    @Id
    @Column(name = "player_recomendation_id", nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "player_recomendation_area", nullable = false, unique = false)
    private String area;

    @Lob
    @Column(columnDefinition = "TEXT", name = "player_recomendation_description", nullable = false, unique = false)
    private String description;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "player_id", referencedColumnName = "player_id")
    private Player player;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "match_id", referencedColumnName = "match_id")
    private Match match;

    public PlayerRecomendation() {

    }

    public PlayerRecomendation(long id, String area, String description, Player player, Match match) {
        this.id = id;
        this.area = area;
        this.description = description;
        this.player = player;
        this.match = match;
    }

    public PlayerRecomendation(String area, String description, Player player, Match match) {
        this.area = area;
        this.description = description;
        this.player = player;
        this.match = match;
    }

    public long getId() {
        return this.id;
    }

    public String getArea() {
        return this.area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Player getPlayer() {
        return this.player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    public Match getMatch() {
        return this.match;
    }

    public void setMatch(Match match) {
        this.match = match;
    }

    public PlayerRecomendationDTO toDTO() {
        PlayerRecomendationDTO playerRecomendationDTO = new PlayerRecomendationDTO(this.id, this.area, this.description,
                this.player.toDTOWithoutStatsAndCalls(), this.match.toDTOwithoutCalls());

        return playerRecomendationDTO;
    }
}
