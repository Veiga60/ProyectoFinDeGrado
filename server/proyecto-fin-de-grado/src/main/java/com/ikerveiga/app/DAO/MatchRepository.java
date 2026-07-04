package com.ikerveiga.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ikerveiga.app.entity.Match;

public interface MatchRepository extends JpaRepository<Match, Long> {

    Match findById(long id);

    @Query("SELECT a FROM Match a WHERE a.clubTeam.id = :clubTeamId ORDER BY date, time ASC")
    List<Match> findByClubTeamId(Long clubTeamId);

    @Query("SELECT a FROM Match a ORDER BY date, time ASC")
    List<Match> findAll();

    @Query("SELECT a FROM Match a WHERE isPlayed = false ORDER BY date, time ASC")
    List<Match> findNextMatches();

    @Query("SELECT a FROM Match a WHERE isPlayed = true ORDER BY date DESC, time DESC")
    List<Match> findPlayedMatchesBackwards();

    @Query("SELECT a FROM Match a WHERE a.isPlayed = true AND EXISTS (SELECT r FROM TeamRecomendation r WHERE r.match = a) ORDER BY a.date DESC, a.time DESC")
    List<Match> findPlayedMatchesWithRecomendationsBackwards();
}
