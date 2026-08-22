package com.ikerveiga.app.entity;

import java.util.ArrayList;
import java.util.List;

import com.ikerveiga.app.dto.ClubTeamDTO;
import com.ikerveiga.app.dto.CoachDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "coaches")
public class Coach {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "coach_id", nullable = false, unique = true)
    private long id;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "coach_club_teams", joinColumns = @JoinColumn(name = "coach_id"), inverseJoinColumns = @JoinColumn(name = "club_team_id"))
    private List<ClubTeam> clubTeams;

    public Coach() {
    }

    public Coach(long id, List<ClubTeam> clubTeams) {
        this.id = id;
        this.clubTeams = clubTeams;
    }

    public Coach(List<ClubTeam> clubTeams) {
        this.clubTeams = clubTeams;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public List<ClubTeam> getClubTeams() {
        return this.clubTeams;
    }

    public void setClubTeams(List<ClubTeam> clubTeams) {
        this.clubTeams = clubTeams;
    }

    public CoachDTO toDTO() {
        List<ClubTeamDTO> clubTeamsDTO = new ArrayList<>();

        if (this.clubTeams != null) {
            for (ClubTeam clubTeam : this.clubTeams) {
                clubTeamsDTO.add(clubTeam.toDTO());
            }
        }

        return new CoachDTO(this.id, clubTeamsDTO);
    }

}
