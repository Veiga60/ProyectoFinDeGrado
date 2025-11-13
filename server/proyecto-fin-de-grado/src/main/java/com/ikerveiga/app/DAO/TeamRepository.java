package com.ikerveiga.app.DAO;

import org.springframework.stereotype.Repository;

import com.ikerveiga.app.entity.Team;

@Repository
public interface TeamRepository {
    Team finById(long id);
}
