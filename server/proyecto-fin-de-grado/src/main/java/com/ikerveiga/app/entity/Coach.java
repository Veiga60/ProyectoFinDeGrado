package com.ikerveiga.app.entity;

import java.util.ArrayList;
import java.util.List;

import com.ikerveiga.app.dto.ClubTeamDTO;
import com.ikerveiga.app.dto.CoachDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "coaches")
public class Coach extends User {

    @Column(name = "coach_password", nullable = true, unique = false)
    String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "coach_club_teams", joinColumns = @JoinColumn(name = "coach_id"), inverseJoinColumns = @JoinColumn(name = "club_team_id"))
    private List<ClubTeam> clubTeams;

    public Coach() {

    }

    public Coach(String username, String email, String password, boolean isCoach,
            List<ClubTeam> clubTeams) {
        super(username, email, true);
        this.password = password;
        this.clubTeams = clubTeams;
    }

    public Coach(long id, String username, List<ClubTeam> clubTeams) {
        super(id, username);
        this.clubTeams = clubTeams;
    }

    public Coach(long id, String username, String email, boolean isCoach, List<ClubTeam> clubTeams) {
        super(id, username, email, true);
        this.clubTeams = clubTeams;
    }

    public Coach(String username, String email, boolean isCoach, List<ClubTeam> clubTeams) {
        super(username, email, true);
        this.clubTeams = clubTeams;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<ClubTeam> getClubTeams() {
        return this.clubTeams;
    }

    public void setClubTeams(List<ClubTeam> clubTeams) {
        this.clubTeams = clubTeams;
    }

    public CoachDTO toDTO() {
        List<ClubTeamDTO> clubTeamsDTO = new ArrayList<>();

        for (ClubTeam clubTeam : this.clubTeams) {
            clubTeamsDTO.add(clubTeam.toDTO());
        }

        return new CoachDTO(this.id, this.username, this.email, this.password, true, clubTeamsDTO);
    }

}
