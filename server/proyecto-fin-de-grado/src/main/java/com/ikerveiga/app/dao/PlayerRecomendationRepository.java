package com.ikerveiga.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ikerveiga.app.entity.PlayerRecomendation;

@Repository
public interface PlayerRecomendationRepository extends JpaRepository<PlayerRecomendation, Long> {

    PlayerRecomendation findById(long id);
}
