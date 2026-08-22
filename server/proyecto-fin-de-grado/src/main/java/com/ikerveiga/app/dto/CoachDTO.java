package com.ikerveiga.app.dto;

import java.util.List;

public class CoachDTO extends UserDTO {

    private List<ClubTeamDTO> clubTeams;

    public CoachDTO() {
    }

    public CoachDTO(long id, List<ClubTeamDTO> clubTeams) {
        this.id = id;
        this.clubTeams = clubTeams;
    }

    public CoachDTO(long id, String username, String email, String password, boolean isCoach,
            List<ClubTeamDTO> clubTeams) {
        super(id, username, email, password, true);
        this.clubTeams = clubTeams;
    }

    public CoachDTO(long id, String username, String email, List<ClubTeamDTO> clubTeams) {
        super(id, username, email, true);
        this.clubTeams = clubTeams;
    }

    public List<ClubTeamDTO> getClubTeams() {
        return clubTeams;
    }

    public void setClubTeams(List<ClubTeamDTO> clubTeams) {
        this.clubTeams = clubTeams;
    }
}
