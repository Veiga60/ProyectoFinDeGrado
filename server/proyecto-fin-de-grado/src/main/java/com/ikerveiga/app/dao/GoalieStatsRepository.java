package com.ikerveiga.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ikerveiga.app.entity.GoalieStats;

@Repository
public interface GoalieStatsRepository extends JpaRepository<GoalieStats, Long> {

    GoalieStats findById(long id);

    List<GoalieStats> findAll();
}