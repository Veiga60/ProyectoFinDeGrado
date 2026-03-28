package com.ikerveiga.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ikerveiga.app.entity.StickFlex;

@Repository
public interface StickFlexRepository extends JpaRepository<StickFlex, Long> {

    StickFlex findById(long id);
}
