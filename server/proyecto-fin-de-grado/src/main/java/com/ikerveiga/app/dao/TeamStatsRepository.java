package com.ikerveiga.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ikerveiga.app.entity.TeamStats;

@Repository
public interface TeamStatsRepository extends JpaRepository<TeamStats, Long> {

    TeamStats findById(long id);

    @Query("SELECT a FROM TeamStats a WHERE a.clubTeam.id = :clubTeamId")
    TeamStats findByClubTeamId(@Param("clubTeamId") long clubTeamId);
}
