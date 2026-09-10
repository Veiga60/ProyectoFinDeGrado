package com.ikerveiga.app.entity;

import java.util.ArrayList;
import java.util.List;

import com.ikerveiga.app.dto.DebateCategoryDTO;
import com.ikerveiga.app.dto.DebateDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "debate_categories")
public class DebateCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id", nullable = false, unique = true)
    private long id;

    @Column(name = "category_name", nullable = false, unique = false)
    private String name;

    @OneToMany(mappedBy = "category")
    private List<Debate> debates;

    @ManyToOne
    @JoinColumn(name = "club_team_id", nullable = false)
    private ClubTeam clubTeam;

    public DebateCategory() {

    }

    public DebateCategory(long id, String name, List<Debate> debates, ClubTeam clubTeam) {
        this.id = id;
        this.name = name;
        this.debates = debates;
        this.clubTeam = clubTeam;
    }

    public DebateCategory(long id, String name, ClubTeam clubTeam) {
        this.id = id;
        this.name = name;
        this.clubTeam = clubTeam;
    }

    public long getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Debate> getDebates() {
        return this.debates;
    }

    public void setDebates(List<Debate> debates) {
        this.debates = debates;
    }

    public ClubTeam getClubTeam() {
        return this.clubTeam;
    }

    public void setClubTeam(ClubTeam clubTeam) {
        this.clubTeam = clubTeam;
    }

    public DebateCategoryDTO toDTO() {
        List<DebateDTO> debatesDTO = new ArrayList<>();
        for (Debate debate : this.debates) {
            debatesDTO.add(debate.toDTO());
        }

        DebateCategoryDTO debateCategoryDTO = new DebateCategoryDTO(this.id, this.name, debatesDTO,
                this.clubTeam.toDTO());

        return debateCategoryDTO;
    }

    public DebateCategoryDTO toDTOWithoutDebates() {

        DebateCategoryDTO debateCategoryDTO = new DebateCategoryDTO(this.id, this.name, this.clubTeam.toDTO());

        return debateCategoryDTO;
    }
}
