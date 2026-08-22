package com.ikerveiga.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.dao.ClubTeamRepository;
import com.ikerveiga.app.entity.ClubTeam;

@Service
public class ClubTeamService {

    private ClubTeamRepository clubTeamDAO;

    @Autowired
    public ClubTeamService(ClubTeamRepository clubTeamDAO) {
        this.clubTeamDAO = clubTeamDAO;
    }

    public List<ClubTeam> getAllClubTeams() {
        List<ClubTeam> clubTeams = clubTeamDAO.findAll();

        if (clubTeams.isEmpty()) {
            throw new RuntimeException("No se han encontrado categorías");
        }

        return clubTeams;
    }

}
