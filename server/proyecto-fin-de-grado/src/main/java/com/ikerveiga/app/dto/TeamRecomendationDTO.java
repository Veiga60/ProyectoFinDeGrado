package com.ikerveiga.app.dto;

public class TeamRecomendationDTO {

    private long id;
    private String area;
    private String description;
    private MatchDTO match;

    public TeamRecomendationDTO() {

    }

    public TeamRecomendationDTO(long id, String area, String description, MatchDTO match) {
        this.id = id;
        this.area = area;
        this.description = description;
        this.match = match;
    }

    public TeamRecomendationDTO(String area, String description, MatchDTO match) {
        this.area = area;
        this.description = description;
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

    public MatchDTO getMatch() {
        return this.match;
    }

    public void setMatch(MatchDTO match) {
        this.match = match;
    }
}
