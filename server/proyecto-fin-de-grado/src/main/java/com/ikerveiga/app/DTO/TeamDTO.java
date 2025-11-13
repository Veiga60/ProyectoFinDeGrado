package com.ikerveiga.app.DTO;

public class TeamDTO {

    private String name;

    private String logo;

    public TeamDTO(String name, String logo) {
        this.name = name;
        this.logo = logo;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLogo() {
        return this.logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }
}
