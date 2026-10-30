package com.ikerveiga.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.dao.ClubRepository;
import com.ikerveiga.app.entity.Club;
import com.ikerveiga.app.security.TenantContext;

@Service
public class ClubService {

    ClubRepository clubDAO;

    @Autowired
    public ClubService(ClubRepository clubDAO) {
        this.clubDAO = clubDAO;
    }

    public Club getCurrentClub() {
        String clubCode = TenantContext.getCurrentTenant();

        if (clubCode == null) {
            throw new RuntimeException("Ningún club asociado a ese código");
        }

        Club club = clubDAO.findByCode(clubCode);

        if (club == null) {
            throw new RuntimeException("Club no encontrado");
        }

        return club;
    }
}
