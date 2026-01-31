package com.ikerveiga.app.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ikerveiga.app.entity.TeamStats;

@Repository
public interface TeamStatsRepository extends JpaRepository<TeamStats, Long> {

    TeamStats findById(long id);
}
