package com.ikerveiga.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ikerveiga.app.entity.GoalieMatchStats;

@Repository
public interface GoalieMatchStatsRepository extends JpaRepository<GoalieMatchStats, Long> {

    GoalieMatchStats findById(long id);

    List<GoalieMatchStats> findAll();

    GoalieMatchStats findByMatchId(long id);

    @Query("SELECT a FROM GoalieMatchStats a WHERE a.match.id = :matchId AND a.goalie.id = :playerId")
    GoalieMatchStats findByMatchIdAndPlayerId(@Param("matchId") long matchId, @Param("playerId") long playerId);
}
