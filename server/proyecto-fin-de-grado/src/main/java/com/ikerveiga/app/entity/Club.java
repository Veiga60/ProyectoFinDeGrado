package com.ikerveiga.app.entity;

import com.ikerveiga.app.dto.ClubDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "clubs")
public class Club {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "club_id", unique = true, nullable = false)
    private long id;

    @Column(name = "club_name", unique = true, nullable = false)
    private String name;

    @Column(name = "club_code", unique = true, nullable = false)
    private String code;

    @Column(name = "club_logo", unique = false, nullable = true)
    private String logo;

    @Column(name = "club_primary_color", unique = false, nullable = true)
    private String primaryColor;

    @Column(name = "club_secondary_color", unique = false, nullable = true)
    private String secondaryColor;

    @Column(name = "club_isActive", unique = false, nullable = false)
    private boolean isActive = true;

    public Club() {
    }

    public Club(long id, String name, String code, String logo, String primaryColor, String secondaryColor, boolean isActive) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.logo = logo;
        this.primaryColor = primaryColor;
        this.secondaryColor = secondaryColor;
        this.isActive = isActive;
    }

    public Club(String name, String code, String logo, String primaryColor, String secondaryColor, boolean isActive) {
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

    public ClubDTO toDTO() {
        return new ClubDTO(this.id, this.name, this.code, this.logo, this.primaryColor, this.secondaryColor, this.isActive);
    }
}
