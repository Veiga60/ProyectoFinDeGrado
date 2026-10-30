package com.ikerveiga.app.dto;

public class ClubDTO {

    private long id;
    private String name;
    private String code;
    private String logo;
    private String primaryColor;
    private String secondaryColor;
    private boolean isActive;

    public ClubDTO() {
    }

    public ClubDTO(long id, String name, String code, String logo, String primaryColor, String secondaryColor, boolean isActive) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.logo = logo;
        this.primaryColor = primaryColor;
        this.secondaryColor = secondaryColor;
        this.isActive = isActive;
    }

    public ClubDTO(String name, String code, String logo, String primaryColor, String secondaryColor, boolean isActive) {
        this.name = name;
        this.code = code;
        this.logo = logo;
        this.primaryColor = primaryColor;
        this.secondaryColor = secondaryColor;
        this.isActive = isActive;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return this.code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getLogo() {
        return this.logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getPrimaryColor() {
        return this.primaryColor;
    }

    public void setPrimaryColor(String primaryColor) {
        this.primaryColor = primaryColor;
    }

    public String getSecondaryColor() {
        return this.secondaryColor;
    }

    public void setSecondaryColor(String secondaryColor) {
        this.secondaryColor = secondaryColor;
    }

    public boolean getIsActive() {
        return this.isActive;
    }

    public void setIsActive(boolean isActive) {
        this.isActive = isActive;
    }
}

