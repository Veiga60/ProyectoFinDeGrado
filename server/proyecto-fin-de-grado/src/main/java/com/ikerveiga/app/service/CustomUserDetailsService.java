package com.ikerveiga.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.CustomUserDetails;
import com.ikerveiga.app.dao.OAuth2UserRepository;
import com.ikerveiga.app.dao.UserRepository;
import com.ikerveiga.app.dto.PlayerDTO;
import com.ikerveiga.app.entity.User;

import io.jsonwebtoken.lang.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    UserRepository userDAO;
    OAuth2UserRepository oAuth2UserDAO;

    @Autowired
    public CustomUserDetailsService(UserRepository userDAO, OAuth2UserRepository oAuth2UserDAO) {
        this.userDAO = userDAO;
        this.oAuth2UserDAO = oAuth2UserDAO;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userDAO.findByUsername(username);
        if (user == null) {
            user = oAuth2UserDAO.findByUsername(username);
        }
        if (user == null) {
            throw new UsernameNotFoundException("Usuario con nombre " + username + " no encontrado.");
        }

        String password = null;

        if (user.getPassword() != null) {
            password = user.getPassword();
        } else {
            password = "";
        }

        PlayerDTO playerDTO = user.getPlayer() != null ? user.getPlayer().toDTOWithoutStatsAndCalls() : null;

        return new CustomUserDetails(
                user.getUsername(),
                user.getEmail(),
                password,
                user.getIsCoach(),
                playerDTO,
                Collections.emptyList());
    }

    public UserDetails loadUserByEmail(String email) throws UsernameNotFoundException {
        User user = userDAO.findByEmail(email);
        if (user == null) {
            user = oAuth2UserDAO.findByEmail(email);
        }

        if (user == null) {
            throw new UsernameNotFoundException("Usuario con nombre " + email + " no encontrado.");
        }

        PlayerDTO playerDTO;
        String password;

        if (user.getPassword() != null) {
            password = user.getPassword();
        } else {
            password = "";
        }

        if (user.getPlayer() != null) {
            playerDTO = user.getPlayer().toDTOWithoutStatsAndCalls();
        } else {
            playerDTO = null;
        }

        return new CustomUserDetails(
                user.getUsername(),
                user.getEmail(),
                password,
                user.getIsCoach(),
                playerDTO,
                Collections.emptyList());
    }
}
