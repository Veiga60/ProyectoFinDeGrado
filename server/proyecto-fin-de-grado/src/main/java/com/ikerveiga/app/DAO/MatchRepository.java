package com.ikerveiga.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ikerveiga.app.entity.Match;

public interface MatchRepository extends JpaRepository<Match, Long> {

    Match findById(long id);

    @Query("SELECT a FROM Match a ORDER BY date, time ASC")
    List<Match> findAll();

    @Query("SELECT a FROM Match a WHERE isPlayed = false ORDER BY date, time ASC")
    List<Match> findNextMatches();
}
