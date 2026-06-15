package com.ikerveiga.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ikerveiga.app.entity.WheelHardness;

@Repository
public interface WheelHardnessRepository extends JpaRepository<WheelHardness, Long> {

    WheelHardness findById(long id);
}
