package com.ikerveiga.app.dto;

public class PlayerRecomendationDTO {

    private long id;
    private String area;
    private String description;
    private PlayerDTO player;
    private MatchDTO match;

    public PlayerRecomendationDTO() {

    }

    public PlayerRecomendationDTO(long id, String area, String description, PlayerDTO player, MatchDTO match) {
        this.id = id;
        this.area = area;
        this.description = description;
        this.player = player;
        this.match = match;
    }

    public PlayerRecomendationDTO(String area, String description, PlayerDTO player, MatchDTO match) {
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

    public PlayerDTO getPlayer() {
        return this.player;
    }

    public void setPlayer(PlayerDTO player) {
        this.player = player;
    }

    public MatchDTO getMatch() {
        return this.match;
    }

    public void setMatch(MatchDTO match) {
        this.match = match;
    }
}
