package com.ikerveiga.app.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import com.ikerveiga.app.dto.ClubTeamDTO;

@Entity
@Table(name = "club_teams")
public class ClubTeam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "club_team_id", nullable = false, unique = true)
    long id;

    @Column(name = "club_team_code", nullable = false, unique = true)
    String code;

    @Column(name = "club_team_description", nullable = false, unique = true)
    String description;

    public ClubTeam() {

    }

    public ClubTeam(long id, String code, String description) {
        this.id = id;
        this.code = code;
        this.description = description;
    }

    public ClubTeam(String code, String description) {
        this.code = code;
        this.description = description;
    }

    public long getId() {
        return this.id;
    }

    public String getCode() {
        return this.code;
    }

    public String getDescription() {
        return this.description;
    }

    public ClubTeamDTO toDTO() {
        return new ClubTeamDTO(this.id, this.code, this.description);
    }
}