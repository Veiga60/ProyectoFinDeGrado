package com.ikerveiga.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ikerveiga.app.entity.ClubTeam;

public interface ClubTeamRepository extends JpaRepository<ClubTeam, Long> {

    ClubTeam findById(long id);

    ClubTeam findByCode(String code);
}