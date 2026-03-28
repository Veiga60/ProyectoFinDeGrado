package com.ikerveiga.app.entity;

import com.ikerveiga.app.dto.StickKickpointDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "stick_kickpoints")
public class StickKickpoint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stick_kickpoint_id", nullable = false, unique = true)
    private long id;

    @Column(name = "stick_kickpoint_description", nullable = false, unique = true)
    private String description;

    public StickKickpoint() {

    }

    public StickKickpoint(long id, String description) {
        this.id = id;
        this.description = description;
    }

    public StickKickpoint(String description) {
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

    public StickKickpointDTO toDTO() {
        StickKickpointDTO stickKickpointDTO = new StickKickpointDTO(this.id, this.description);

        return stickKickpointDTO;
    }
}
