package com.ikerveiga.app.entity;

import com.ikerveiga.app.dto.StickBladeDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "stick_blades")
public class StickBlade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stick_blade_id", nullable = false, unique = true)
    private long id;

    @Column(name = "stick_blade_description", nullable = false, unique = true)
    private String description;

    public StickBlade() {

    }

    public StickBlade(long id, String description) {
        this.id = id;
        this.description = description;
    }

    public StickBlade(String description) {
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

    public StickBladeDTO toDTO() {
        StickBladeDTO stickBladeDTO = new StickBladeDTO(this.id, this.description);

        return stickBladeDTO;
    }
}
