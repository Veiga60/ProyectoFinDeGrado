package com.ikerveiga.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ikerveiga.app.entity.Debate;
import com.ikerveiga.app.enums.DebateCategory;

@Repository
public interface DebateRepository extends JpaRepository<Debate, Long> {

    Debate findById(long id);

    Debate findByTitle(String title);

    List<Debate> findByCategory(DebateCategory category);
}
