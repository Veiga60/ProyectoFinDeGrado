package com.ikerveiga.app.dto;

public class StickGripDTO {

    private long id;
    private String description;

    public StickGripDTO() {

    }

    public StickGripDTO(long id, String description) {
        this.id = id;
        this.description = description;
    }

    public StickGripDTO(String description) {
        this.description = description;
    }

    public long getId() {
        return this.id;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
