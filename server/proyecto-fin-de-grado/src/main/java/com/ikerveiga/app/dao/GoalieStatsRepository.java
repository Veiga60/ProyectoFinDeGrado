package com.ikerveiga.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ikerveiga.app.entity.GoalieStats;

@Repository
public interface GoalieStatsRepository extends JpaRepository<GoalieStats, Long> {

    GoalieStats findById(long id);

    List<GoalieStats> findAll();

    GoalieStats findByGoalieId(long id);

    @Query("SELECT a FROM GoalieStats a WHERE a.goalie.id = :playerId AND a.clubTeam.id = :clubTeamId")
    GoalieStats findByPlayerIdAndClubTeamId(@Param("playerId") long playerId, @Param("clubTeamId") long clubTeamId);
}