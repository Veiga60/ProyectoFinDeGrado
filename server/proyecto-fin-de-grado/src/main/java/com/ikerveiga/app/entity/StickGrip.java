package com.ikerveiga.app.entity;

import com.ikerveiga.app.dto.StickGripDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "stick_grips")
public class StickGrip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stick_grip_id", nullable = false, unique = true)
    private long id;

    @Column(name = "stick_grip_description", nullable = false, unique = true)
    private String description;

    public StickGrip() {

    }

    public StickGrip(long id, String description) {
        this.id = id;
        this.description = description;
    }

    public StickGrip(String description) {
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

    public StickGripDTO toDTO() {
        StickGripDTO stickGripDTO = new StickGripDTO(this.id, this.description);

        return stickGripDTO;
    }
}
