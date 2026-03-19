package com.ikerveiga.app.dto;

public class OrderTypeDTO {

    private long id;
    private String description;

    public OrderTypeDTO() {

    }

    public OrderTypeDTO(long id, String description) {
        this.id = id;
        this.description = description;
    }

    public OrderTypeDTO(String description) {
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
