package com.ikerveiga.app.dto;

import java.util.List;

public class DebateCategoryDTO {

    private long id;
    private String name;
    private List<DebateDTO> debates;
    private ClubTeamDTO clubTeam;

    public DebateCategoryDTO() {

    }

    public DebateCategoryDTO(long id, String name, List<DebateDTO> debates, ClubTeamDTO clubTeam) {
        this.id = id;
        this.name = name;
        this.debates = debates;
        this.clubTeam = clubTeam;
    }

    public DebateCategoryDTO(long id, String name, ClubTeamDTO clubTeam) {
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

    public List<DebateDTO> getDebates() {
        return this.debates;
    }

    public void setDebates(List<DebateDTO> debates) {
        this.debates = debates;
    }

    public ClubTeamDTO getClubTeam() {
        return this.clubTeam;
    }

    public void setClubTeam(ClubTeamDTO clubTeam) {
        this.clubTeam = clubTeam;
    }
}
