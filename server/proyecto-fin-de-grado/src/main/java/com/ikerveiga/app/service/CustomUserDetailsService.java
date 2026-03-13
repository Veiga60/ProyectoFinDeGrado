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
import com.ikerveiga.app.entity.OAuth2User;
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
        User user = userDAO.findByUserName(username);
        if (user == null) {
            throw new UsernameNotFoundException("Usuario con nombre " + username + " no encontrado.");
        }

        String password = null;

        if (user.getPassword() != null) {
            password = user.getPassword();
        } else {
            password = "";
        }

        return new CustomUserDetails(
                user.getUsername(),
                user.getEmail(),
                password,
                user.getIsCoach(),
                user.getPlayer().toDTOWithoutStatsAndCalls(),
                Collections.emptyList());
    }

    public UserDetails loadUserByEmail(String email) throws UsernameNotFoundException {
        User user = userDAO.findByEmail(email);

        OAuth2User oAuth2user = null;
        if (user == null) {
            oAuth2user = oAuth2UserDAO.findByEmail(email);
        }

        if (user == null && oAuth2user == null) {
            throw new UsernameNotFoundException("Usuario con nombre " + email + " no encontrado.");
        }

        PlayerDTO playerDTO;

        if (user != null) {
            if (user.getPlayer() != null) {
                playerDTO = user.getPlayer().toDTOWithoutStatsAndCalls();
            } else {
                playerDTO = null;
            }

            return new CustomUserDetails(
                    user.getUsername(),
                    user.getEmail(),
                    user.getPassword(),
                    user.getIsCoach(),
                    playerDTO,
                    Collections.emptyList());
        } else {
            if (oAuth2user.getPlayer() != null) {
                playerDTO = oAuth2user.getPlayer().toDTOWithoutStatsAndCalls();
            } else {
                playerDTO = null;
            }

            return new CustomUserDetails(
                    oAuth2user.getUsername(),
                    oAuth2user.getEmail(),
                    "",
                    oAuth2user.getIsCoach(),
                    playerDTO,
                    Collections.emptyList());
        }

    }

}
