package com.ikerveiga.app.entity;

import com.ikerveiga.app.dto.StickWeightDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "stick_weights")
public class StickWeight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stick_weight_id", nullable = false, unique = true)
    private long id;

    @Column(name = "stick_weight_description", nullable = false, unique = true)
    private String description;

    public StickWeight() {

    }

    public StickWeight(long id, String description) {
        this.id = id;
        this.description = description;
    }

    public StickWeight(String description) {
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

    public StickWeightDTO toDTO() {
        StickWeightDTO stickWeightDTO = new StickWeightDTO(this.id, this.description);

        return stickWeightDTO;
    }
}
