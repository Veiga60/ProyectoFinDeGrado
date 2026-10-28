package com.ikerveiga.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ikerveiga.app.entity.Club;

public interface ClubRepository extends JpaRepository<Club, Long> {

    Club findById(long id);

    Club findByCode(String code);

    Club findByName(String name);
}

