package com.ikerveiga.app.entity;

import com.ikerveiga.app.dto.WheelHardnessDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "wheel_hardnesses")
public class WheelHardness {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wheel_hardness_id")
    private long id;

    @Column(name = "wheel_hardness_description", nullable = false, unique = true)
    private String description;

    public WheelHardness() {

    }

    public WheelHardness(long id, String description) {
        this.id = id;
        this.description = description;
    }

    public WheelHardness(String description) {
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

    public WheelHardnessDTO toDTO() {
        WheelHardnessDTO wheelHardnessDTO = new WheelHardnessDTO(this.id, this.description);

        return wheelHardnessDTO;
    }
}
