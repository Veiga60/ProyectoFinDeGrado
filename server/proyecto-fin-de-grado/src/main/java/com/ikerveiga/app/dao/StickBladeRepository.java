package com.ikerveiga.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ikerveiga.app.entity.StickBlade;

@Repository
public interface StickBladeRepository extends JpaRepository<StickBlade, Long> {

    StickBlade findById(long id);
}
