package com.ikerveiga.app.DAO;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;

import com.ikerveiga.app.entity.Team;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {

    Team findById(long id);
}
