package com.ikerveiga.app.dto;

import java.util.List;

public class CoachDTO {

    private long id;
    private List<ClubTeamDTO> clubTeams;

    public CoachDTO() {
    }

    public long getId() {
        return this.id;
    }

    public CoachDTO(long id, List<ClubTeamDTO> clubTeams) {
        this.id = id;
        this.clubTeams = clubTeams;
    }

    public List<ClubTeamDTO> getClubTeams() {
        return clubTeams;
    }

    public void setClubTeams(List<ClubTeamDTO> clubTeams) {
        this.clubTeams = clubTeams;
    }
}
