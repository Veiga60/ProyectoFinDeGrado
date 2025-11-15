package com.ikerveiga.app.DAO;

import org.springframework.stereotype.Repository;

import com.ikerveiga.app.entity.Player;

@Repository
public interface PlayerRepository {
    
    Player findById(long Id);
}
