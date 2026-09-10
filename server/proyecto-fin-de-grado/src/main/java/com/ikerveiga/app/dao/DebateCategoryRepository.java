package com.ikerveiga.app.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ikerveiga.app.entity.DebateCategory;

@Repository
public interface DebateCategoryRepository extends JpaRepository<DebateCategory, Long> {

    DebateCategory findById(long id);
    List<DebateCategory> findByClubTeamId(long id);
}

