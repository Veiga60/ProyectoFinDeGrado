package com.ikerveiga.app.dto;

public class ClubTeamDTO {

    long id;
    String code;
    String description;

    public ClubTeamDTO() {
    }

    public ClubTeamDTO(long id, String code, String description) {
        this.id = id;
        this.code = code;
        this.description = description;
    }

    public ClubTeamDTO(String code, String description) {
        this.code = code;
        this.description = description;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public long getId() {
        return this.id;
    }

    public String getCode() {
        return this.code;
    }

    public String getDescription() {
        return this.description;
    }
}