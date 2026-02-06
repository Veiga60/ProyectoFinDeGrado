package com.ikerveiga.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ikerveiga.app.entity.TeamMatchStats;

@Repository
public interface TeamMatchStatsRepository extends JpaRepository<TeamMatchStats, Long> {

    TeamMatchStats findById(long id);

    List<TeamMatchStats> findAll();

    TeamMatchStats findByMatchId(long id);
}
