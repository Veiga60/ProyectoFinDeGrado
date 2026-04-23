package com.ikerveiga.app.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "team_recomendations")
public class TeamRecomendation {

    @Id
    @Column(name = "team_recomendation_id", nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "team_recomendation_area", nullable = false, unique = false)
    private String area;

    @Column(name = "team_recomendation_description", nullable = false, unique = false)
    private String description;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "match_id", referencedColumnName = "match_id")
    private Match match;

    public TeamRecomendation() {

    }

    public TeamRecomendation(long id, String area, String description, Match match) {
        this.id = id;
        this.area = area;
        this.description = description;
        this.match = match;
    }

    public TeamRecomendation(String area, String description, Match match) {
        this.area = area;
        this.description = description;
        this.match = match;
    }

    public long getId() {
        return this.id;
    }

    public String getArea() {
        return this.area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Match getMatch() {
        return this.match;
    }

    public void setMatch(Match match) {
        this.match = match;
    }
}
