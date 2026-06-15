package com.ikerveiga.app.entity;

import com.ikerveiga.app.dto.StickFlexDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "stick_flexes")
public class StickFlex {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stick_flex_id", nullable = false, unique = true)
    private long id;

    @Column(name = "stick_flex_description", nullable = false, unique = true)
    private String description;

    public StickFlex() {

    }

    public StickFlex(long id, String description) {
        this.id = id;
        this.description = description;
    }

    public StickFlex(String description) {
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

    public StickFlexDTO toDTO() {
        StickFlexDTO stickFlexDTO = new StickFlexDTO(this.id, this.description);

        return stickFlexDTO;
    }
}
