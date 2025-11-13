package com.ikerveiga.app.DTO;

public class PlayerDTO {

    private String name;

    private String lastName1;

    private String lastName2;

    private String image;

    public PlayerDTO(String name, String lastName1, String lastName2, String image) {
        this.name = name;
        this.lastName1 = lastName1;
        this.lastName2 = lastName2;
        this.image = image;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName1() {
        return this.lastName1;
    }

    public void setLastName1(String lastName1) {
        this.lastName1 = lastName1;
    }

    public String getLastName2() {
        return this.lastName2;
    }

    public void setLastName2(String lastName2) {
        this.lastName2 = lastName2;
    }

    public String getImage() {
        return this.image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
