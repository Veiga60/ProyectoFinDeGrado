package com.ikerveiga.app.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ikerveiga.app.entity.PlayerMatchStats;

public interface PlayerMatchStatsRepository extends JpaRepository<PlayerMatchStats, Long> {

    PlayerMatchStats findById(long id);

    List<PlayerMatchStats> findAll();

    PlayerMatchStats findByMatchId(long id);

    @Query("SELECT a FROM PlayerMatchStats a WHERE a.match.id = :matchId AND a.player.id = :playerId")
    PlayerMatchStats findByMatchIdAndPlayerId(@Param("matchId") long matchId, @Param("playerId") long playerId);

}
