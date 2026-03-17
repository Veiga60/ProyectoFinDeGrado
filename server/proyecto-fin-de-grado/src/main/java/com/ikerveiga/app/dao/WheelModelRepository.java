package com.ikerveiga.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ikerveiga.app.entity.WheelModel;

@Repository
public interface WheelModelRepository extends JpaRepository<WheelModel, Long> {

}
