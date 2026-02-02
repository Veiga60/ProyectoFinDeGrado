package com.ikerveiga.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.ikerveiga.app.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findById(long id);

    User findByEmail(String email);

    User findByUserName(String userName);

    @Query("UPDATE User a SET a.isCoach = :isCoach WHERE a.email = :email")
    @Modifying
    @Transactional
    void setIsCoach(@Param("isCoach") boolean isCoach, @Param("email") String email);
}
