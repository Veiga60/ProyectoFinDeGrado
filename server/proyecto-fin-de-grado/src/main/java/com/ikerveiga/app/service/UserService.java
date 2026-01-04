package com.ikerveiga.app.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.entity.User;

import jakarta.servlet.http.HttpServletResponse;

import com.ikerveiga.app.JWT.JwtUtil;
import com.ikerveiga.app.cookies.CookiesService;
import com.ikerveiga.app.dao.UserRepository;
import com.ikerveiga.app.CustomUserDetails;

@Service
public class UserService {

    UserRepository userDAO;
    JwtUtil jwtUtil;
    AuthenticationManager authManager;
    PasswordEncoder passwordEncoder;
    CookiesService cookiesService;

    @Autowired
    public UserService(UserRepository userDAO, JwtUtil jwtUtil, AuthenticationManager authManager,
            PasswordEncoder passwordEncoder, CookiesService cookiesService) {
        this.userDAO = userDAO;
        this.jwtUtil = jwtUtil;
        this.authManager = authManager;
        this.passwordEncoder = passwordEncoder;
        this.cookiesService = cookiesService;
    }

    public Map<String, Object> getAuthenticatedUser() {
        Map<String, Object> userInfo = new HashMap<>();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        String email = ((CustomUserDetails) authentication.getPrincipal()).getEmail();
        Boolean isCoach = ((CustomUserDetails) authentication.getPrincipal()).getIsCoach();

        userInfo.put("username", username);
        userInfo.put("email", email);
        userInfo.put("isCoach", isCoach);

        return userInfo;
    }

    public void signup(String name, String email, String password, boolean isCoach) {
        User existingUser = userDAO.findByEmail(email);
        if (existingUser != null) {
            throw new RuntimeException("User already exists");
        }

        User user = new User(name, email, passwordEncoder.encode(password), isCoach);
        userDAO.save(user);
    }

    public void oauth2Signup(String username, String email) {
        User user = new User(username, email, null, false);
        userDAO.save(user);
    }

    public String login(String email, String password, HttpServletResponse response) {
        User user = userDAO.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("No existe un usuario con ese email");
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        } else {
            String jwt = jwtUtil.generateJwtToken(user.getEmail());
            cookiesService.addHttpOnlyCookie("jwt", jwt, 30 * 60, response);
            return jwt;
        }
    }

    public void setIsCoach(boolean isCoach, String email) {
        User user = userDAO.findByEmail(email);

        if (user == null) {
            throw new RuntimeException("Usuario no registrado");
        }

        userDAO.setIsCoach(isCoach, email);
    }
}