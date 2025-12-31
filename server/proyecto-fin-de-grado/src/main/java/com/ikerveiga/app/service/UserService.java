package com.ikerveiga.app.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.entity.User;

import jakarta.servlet.http.HttpServletResponse;

import com.ikerveiga.app.DAO.UserRepository;
import com.ikerveiga.app.JWT.JwtUtil;
import com.ikerveiga.app.cookies.CookiesService;

@Service
public class UserService {

    UserRepository userDAO;
    JwtUtil jwtUtil;
    AuthenticationManager authManager;
    PasswordEncoder passwordEncoder;
    CookiesService cookiesService;

    public Map<String, User> activeUsers = new HashMap<String, User>();

    @Autowired
    public UserService(UserRepository userDAO, JwtUtil jwtUtil, AuthenticationManager authManager,
            PasswordEncoder passwordEncoder, CookiesService cookiesService) {
        this.userDAO = userDAO;
        this.jwtUtil = jwtUtil;
        this.authManager = authManager;
        this.passwordEncoder = passwordEncoder;
        this.cookiesService = cookiesService;
    }

    public void signup(String name, String email, String password, boolean isCoach) {
        User existingUser = userDAO.findByEmail(email);
        if (existingUser != null) {
            throw new RuntimeException("User already exists");
        }

        User user = new User(name, email, passwordEncoder.encode(password), isCoach);
        userDAO.save(user);
    }

    public String login(String userName, String password, HttpServletResponse response) {
        User user = userDAO.findByUserName(userName);
        if (user == null) {
            throw new RuntimeException("User with that username does not exist");
        }

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Incorrect password");
        } else {
            String token = jwtUtil.generateJwtToken(user.getUserName());
            cookiesService.addHttpOnlyCookie("jwt", token, 7 * 24 * 60 * 60, response);
            activeUsers.put(token, user);
            return token;
        }
    }
}