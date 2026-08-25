package com.ikerveiga.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ikerveiga.app.entity.PlayerStats;

@Repository
public interface PlayerStatsRepository extends JpaRepository<PlayerStats, Long> {

    PlayerStats findById(long id);

    List<PlayerStats> findAll();

    PlayerStats findByPlayerId(long id);

    @Query("SELECT a FROM PlayerStats a WHERE a.player.id = :playerId AND a.clubTeam.id = :clubTeamId")
    PlayerStats findByPlayerIdAndClubTeamId(@Param("playerId") long playerId, @Param("clubTeamId") long clubTeamId);
}
