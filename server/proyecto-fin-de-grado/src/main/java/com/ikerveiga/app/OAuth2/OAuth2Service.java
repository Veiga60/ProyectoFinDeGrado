package com.ikerveiga.app.OAuth2;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.DAO.UserRepository;
import com.ikerveiga.app.JWT.JwtUtil;
import com.ikerveiga.app.cookies.CookiesService;
import com.ikerveiga.app.entity.User;

import jakarta.servlet.http.HttpServletResponse;

@Service
public class OAuth2Service {

    JwtUtil jwtUtil;
    CookiesService cookiesService;
    UserRepository userDAO;

    @Autowired
    public OAuth2Service(JwtUtil jwtUtil, CookiesService cookiesService, UserRepository userDAO) {
        this.jwtUtil = jwtUtil;
        this.cookiesService = cookiesService;
        this.userDAO = userDAO;
    }

    public String handleLoginSuccess(String username, String email, HttpServletResponse response) {
        User existingUser = userDAO.findByUserName(username);
        if (existingUser == null) {
            User user = new User(username, email, null, false);
            userDAO.save(user);
        }
        String jwt = jwtUtil.generateJwtToken(username);
        cookiesService.addHttpOnlyCookie("jwt", jwt, 7 * 24 * 60 * 60, response);
        try {
            response.sendRedirect("http://localhost:5173/matches");
        } catch (IOException e) {
            e.printStackTrace();
        }

        return jwt;
    }
}
