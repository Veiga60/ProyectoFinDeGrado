package com.ikerveiga.app.OAuth2;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.JWT.JwtUtil;
import com.ikerveiga.app.cookies.CookiesService;
import com.ikerveiga.app.dao.AuthorizedEmailRepository;
import com.ikerveiga.app.dao.OAuth2UserRepository;
import com.ikerveiga.app.entity.AuthorizedEmail;
import com.ikerveiga.app.entity.OAuth2User;

import jakarta.servlet.http.HttpServletResponse;

@Service
public class OAuth2Service {

    JwtUtil jwtUtil;
    CookiesService cookiesService;
    OAuth2UserRepository userDAO;
    AuthorizedEmailRepository authorizedEmailDAO;

    @Autowired
    public OAuth2Service(JwtUtil jwtUtil, CookiesService cookiesService, OAuth2UserRepository userDAO,
            AuthorizedEmailRepository authorizedEmailDAO) {
        this.jwtUtil = jwtUtil;
        this.cookiesService = cookiesService;
        this.userDAO = userDAO;
        this.authorizedEmailDAO = authorizedEmailDAO;
    }

    public String handleLoginSuccess(String username, String email, HttpServletResponse response) {
        OAuth2User existingUser = userDAO.findByEmail(email);

        String url = (existingUser == null) ? ("http://localhost:5173/select_role") : ("http://localhost:5173/matches");

        if (existingUser == null) {
            AuthorizedEmail authorizedEmail = authorizedEmailDAO.findByEmail(email);
            if (authorizedEmail != null) {
                OAuth2User user = new OAuth2User(username, email, false, authorizedEmail.getPlayer());
                userDAO.save(user);
            } else {
                throw new RuntimeException("Usuario no autorizado");
            }
        }
        String jwt = jwtUtil.generateJwtToken(email);
        cookiesService.addHttpOnlyCookie("jwt", jwt, 30 * 60, response);
        try {
            response.sendRedirect(url);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return jwt;
    }
}
