package com.ikerveiga.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ikerveiga.app.entity.StickWeight;

@Repository
public interface StickWeightRepository extends JpaRepository<StickWeight, Long> {

    StickWeight findById(long id);
}
