package com.ikerveiga.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ikerveiga.app.entity.PlayerStats;

@Repository
public interface PlayerStatsRepository extends JpaRepository<PlayerStats, Long> {

    PlayerStats findById(long id);

    List<PlayerStats> findAll();
}
