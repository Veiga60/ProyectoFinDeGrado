package com.ikerveiga.app.dto;

public class StickFlexDTO {

    private long id;
    private String description;

    public StickFlexDTO() {

    }

    public StickFlexDTO(long id, String description) {
        this.id = id;
        this.description = description;
    }

    public StickFlexDTO(String description) {
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
