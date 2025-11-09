package com.ikerveiga.app.DAO;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;

import com.ikerveiga.app.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    User findById(long id);
}