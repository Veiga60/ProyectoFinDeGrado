package com.ikerveiga.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ikerveiga.app.entity.Coach;

@Repository
public interface CoachRepository extends JpaRepository<Coach, Long> {

    Coach findById(long id);

    Coach findByEmail(String email);

    Coach findByUsername(String username);

    @Query("SELECT c FROM Coach c JOIN FETCH c.clubTeams WHERE c.id = :id")
    Coach findByIdWithClubTeams(@Param("id") long id);

    @Query("SELECT c FROM Coach c JOIN FETCH c.clubTeams WHERE c.email = :email")
    Coach findByEmailWithClubTeams(@Param("email") String email);
}
