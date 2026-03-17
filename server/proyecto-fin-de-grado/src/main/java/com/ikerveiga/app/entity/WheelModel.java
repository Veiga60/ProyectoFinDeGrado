package com.ikerveiga.app.entity;

import com.ikerveiga.app.dto.WheelModelDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "wheel_models")
public class WheelModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wheel_model_id")
    private long id;

    @Column(name = "wheel_model _description", nullable = false, unique = true)
    private String description;

    public WheelModel() {

    }

    public WheelModel(long id, String description) {
        this.id = id;
        this.description = description;
    }

    public WheelModel(String description) {
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

    public WheelModelDTO toDTO() {
        WheelModelDTO wheelModelDTO = new WheelModelDTO(this.id, this.description);

        return wheelModelDTO;
    }

}
