package com.ikerveiga.app.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ikerveiga.app.entity.Match;

public interface MatchRepository extends JpaRepository<Match, Long> {

    Match findById(long id);

    List<Match> findAll();
}
