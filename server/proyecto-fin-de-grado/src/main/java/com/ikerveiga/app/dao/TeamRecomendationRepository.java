package com.ikerveiga.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ikerveiga.app.entity.Match;
import com.ikerveiga.app.entity.TeamRecomendation;

@Repository
public interface TeamRecomendationRepository extends JpaRepository<TeamRecomendation, Long> {

    TeamRecomendation findById(long id);

    List<TeamRecomendation> findByMatch(Match match);
}
