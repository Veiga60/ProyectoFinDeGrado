package com.ikerveiga.app.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.dao.ClubTeamRepository;
import com.ikerveiga.app.dao.CoachRepository;
import com.ikerveiga.app.dao.OAuth2UserRepository;
import com.ikerveiga.app.dao.UserRepository;
import com.ikerveiga.app.entity.ClubTeam;
import com.ikerveiga.app.entity.Coach;
import com.ikerveiga.app.entity.User;

@Service
public class CoachService {

    private CoachRepository coachDAO;
    private UserRepository userDAO;
    private OAuth2UserRepository oAuth2UserDAO;
    private ClubTeamRepository clubTeamDAO;

    @Autowired
    public CoachService(CoachRepository coachDAO, UserRepository userDAO, OAuth2UserRepository oAuth2UserDAO,
            ClubTeamRepository clubTeamDAO) {
        this.coachDAO = coachDAO;
        this.userDAO = userDAO;
        this.oAuth2UserDAO = oAuth2UserDAO;
        this.clubTeamDAO = clubTeamDAO;
    }

    public void setCoachClubTeams(String email, List<String> clubTeamCodes) {
        User user = userDAO.findByEmail(email);

        if (user == null) {
            user = oAuth2UserDAO.findByEmail(email);
        }

        if (user == null) {
            throw new RuntimeException("Entrenador no encontrado");
        }

        if (clubTeamCodes == null || clubTeamCodes.isEmpty()) {
            throw new RuntimeException("Lista de categorías vacía");
        }

        List<ClubTeam> selectedClubTeams = new ArrayList<>();
        for (String code : clubTeamCodes) {
            ClubTeam team = clubTeamDAO.findByCode(code);
            if (team != null) {
                selectedClubTeams.add(team);
            }
        }

        Coach coach = user.getCoach();
        if (coach == null) {
            coach = new Coach();
            coachDAO.save(coach);
            user.setCoach(coach);
        }

        coach.setClubTeams(selectedClubTeams);
        coachDAO.save(coach);

        if (user instanceof com.ikerveiga.app.entity.OAuth2User oAuth2User) {
            oAuth2UserDAO.save(oAuth2User);
        } else {
            userDAO.save(user);
        }
    }
}
