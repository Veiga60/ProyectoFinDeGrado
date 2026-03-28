package com.ikerveiga.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ikerveiga.app.entity.StickModel;

@Repository
public interface StickModelRepository extends JpaRepository<StickModel, Long> {

    StickModel findById(long id);
}
