package com.ikerveiga.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ikerveiga.app.entity.OAuth2User;

@Repository
public interface OAuth2UserRepository extends JpaRepository<OAuth2User, Long> {

    OAuth2User findById(long id);

    OAuth2User findByEmail(String email);
}
