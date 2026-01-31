package com.ikerveiga.app.DAO;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ikerveiga.app.entity.Call;

public interface CallRepository extends JpaRepository<Call, Long> {

    Call findById(long id);

    Call findByMatchId(long matchId);
}
