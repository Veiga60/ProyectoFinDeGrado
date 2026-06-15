package com.ikerveiga.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ikerveiga.app.entity.WheelSize;

@Repository
public interface WheelSizeRepository extends JpaRepository<WheelSize, Long> {

    WheelSize findById(long id);
}
