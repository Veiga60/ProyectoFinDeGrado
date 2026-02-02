package com.ikerveiga.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ikerveiga.app.entity.AuthorizedEmail;

@Repository
public interface AuthorizedEmailRepository extends JpaRepository<AuthorizedEmail, Long> {

    AuthorizedEmail findByEmail(String email);
}
