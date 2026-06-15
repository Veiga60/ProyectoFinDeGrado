package com.ikerveiga.app.dto;

public class StickBladeDTO {

    private long id;
    private String description;

    public StickBladeDTO() {

    }

    public StickBladeDTO(long id, String description) {
        this.id = id;
        this.description = description;
    }

    public StickBladeDTO(String description) {
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
