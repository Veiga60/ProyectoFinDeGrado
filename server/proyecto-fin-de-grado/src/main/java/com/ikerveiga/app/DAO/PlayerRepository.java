package com.ikerveiga.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ikerveiga.app.entity.Player;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {

    Player findById(long id);

    List<Player> findAll();
}
