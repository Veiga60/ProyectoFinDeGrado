package com.ikerveiga.app.entity;

import com.ikerveiga.app.dto.StickLengthDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "stick_lengths")
public class StickLength {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stick_length_id", nullable = false, unique = true)
    private long id;

    @Column(name = "stick_length_description", nullable = false, unique = true)
    private String description;

    public StickLength() {

    }

    public StickLength(long id, String description) {
        this.id = id;
        this.description = description;
    }

    public StickLength(String description) {
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

    public StickLengthDTO toDTO() {
        StickLengthDTO stickLengthDTO = new StickLengthDTO(this.id, this.description);

        return stickLengthDTO;
    }
}
