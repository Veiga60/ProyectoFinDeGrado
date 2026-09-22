package com.ikerveiga.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ikerveiga.app.entity.Match;

public interface MatchRepository extends JpaRepository<Match, Long> {

    Match findById(long id);

    @Query("SELECT a FROM Match a WHERE a.clubTeam.id = :clubTeamId ORDER BY date, time ASC")
    List<Match> findByClubTeamId(Long clubTeamId);

    @Query("SELECT a FROM Match a ORDER BY date, time ASC")
    List<Match> findAll();

    @Query("SELECT a FROM Match a WHERE isPlayed = false AND a.clubTeam.id = :clubTeamId ORDER BY date, time ASC")
    List<Match> findNextMatches(Long clubTeamId);

    @Query("SELECT a FROM Match a WHERE a.isPlayed = true AND a.clubTeam.id = :clubTeamId ORDER BY date DESC, time DESC")
    List<Match> findPlayedMatchesOfClubTeamBackwards(@Param("clubTeamId") long clubTeamId);

    @Query("SELECT a FROM Match a WHERE a.isPlayed = true AND a.clubTeam.id = :clubTeamId AND EXISTS (SELECT r FROM TeamRecomendation r WHERE r.match = a) ORDER BY a.date DESC, a.time DESC")
    List<Match> findPlayedMatchesOfClubTeamWithRecomendationsBackwards(@Param("clubTeamId") long clubTeamId);
}
