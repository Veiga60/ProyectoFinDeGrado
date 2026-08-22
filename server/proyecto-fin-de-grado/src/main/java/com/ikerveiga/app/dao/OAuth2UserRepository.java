package com.ikerveiga.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.ikerveiga.app.entity.OAuth2User;

@Repository
public interface OAuth2UserRepository extends JpaRepository<OAuth2User, Long> {

    OAuth2User findById(long id);

    OAuth2User findByEmail(String email);

    OAuth2User findByUsername(String username);

    @Query("UPDATE OAuth2User a SET a.isCoach = :isCoach WHERE a.email = :email")
    @Modifying
    @Transactional
    void setIsCoach(@Param("isCoach") boolean isCoach, @Param("email") String email);
}
