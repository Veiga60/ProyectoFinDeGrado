package com.ikerveiga.app.dto;

public class WheelModelDTO {

    private long id;
    private String description;

    public WheelModelDTO() {

    }

    public WheelModelDTO(long id, String description) {
        this.id = id;
        this.description = description;
    }

    public WheelModelDTO(String description) {
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
