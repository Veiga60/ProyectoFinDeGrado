package com.ikerveiga.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ikerveiga.app.entity.StickKickpoint;

@Repository
public interface StickKickpointRepository extends JpaRepository<StickKickpoint, Long> {

    StickKickpoint findById(long id);
}
