package com.ikerveiga.app.dto;

public class StickKickpointDTO {

    private long id;
    private String description;

    public StickKickpointDTO() {

    }

    public StickKickpointDTO(long id, String description) {
        this.id = id;
        this.description = description;
    }

    public StickKickpointDTO(String description) {
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
