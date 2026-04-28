package com.ikerveiga.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ikerveiga.app.entity.Match;
import com.ikerveiga.app.entity.Player;
import com.ikerveiga.app.entity.PlayerRecomendation;

@Repository
public interface PlayerRecomendationRepository extends JpaRepository<PlayerRecomendation, Long> {

    PlayerRecomendation findById(long id);

    @Query("SELECT a FROM PlayerRecomendation a WHERE a.player = :player AND a.match = :match")
    List<PlayerRecomendation> findByPlayerAndMatch(@Param("player") Player player, @Param("match") Match match);
}
