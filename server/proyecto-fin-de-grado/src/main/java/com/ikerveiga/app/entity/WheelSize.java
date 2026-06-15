package com.ikerveiga.app.entity;

import com.ikerveiga.app.dto.WheelSizeDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "wheel_sizes")
public class WheelSize {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wheel_size_id")
    private long id;

    @Column(name = "wheel_size_description", nullable = false, unique = true)
    private String description;

    public WheelSize() {

    }

    public WheelSize(long id, String description) {
        this.id = id;
        this.description = description;
    }

    public WheelSize(String description) {
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

    public WheelSizeDTO toDTO() {
        WheelSizeDTO wheelSizeDTO = new WheelSizeDTO(this.id, this.description);

        return wheelSizeDTO;
    }
}
