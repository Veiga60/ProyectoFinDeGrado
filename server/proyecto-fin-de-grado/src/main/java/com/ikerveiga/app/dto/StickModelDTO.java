package com.ikerveiga.app.dto;

public class StickModelDTO {

    private long id;
    private String description;

    public StickModelDTO() {

    }

    public StickModelDTO(long id, String description) {
        this.id = id;
        this.description = description;
    }

    public StickModelDTO(String description) {
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
