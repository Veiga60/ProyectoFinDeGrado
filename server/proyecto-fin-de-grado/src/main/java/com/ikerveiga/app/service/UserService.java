package com.ikerveiga.app.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.entity.AuthorizedEmail;
import com.ikerveiga.app.entity.OAuth2User;
import com.ikerveiga.app.entity.User;

import jakarta.servlet.http.HttpServletResponse;

import com.ikerveiga.app.JWT.JwtUtil;
import com.ikerveiga.app.cookies.CookiesService;
import com.ikerveiga.app.dao.AuthorizedEmailRepository;
import com.ikerveiga.app.dao.OAuth2UserRepository;
import com.ikerveiga.app.dao.UserRepository;
import com.ikerveiga.app.dto.PlayerDTO;
import com.ikerveiga.app.CustomUserDetails;

@Service
public class UserService {

    UserRepository userDAO;
    OAuth2UserRepository oAuth2UserDAO;
    JwtUtil jwtUtil;
    AuthenticationManager authManager;
    PasswordEncoder passwordEncoder;
    CookiesService cookiesService;
    AuthorizedEmailRepository authorizedEmailDAO;

    @Autowired
    public UserService(UserRepository userDAO, OAuth2UserRepository oAuth2UserDAO, JwtUtil jwtUtil,
            AuthenticationManager authManager,
            PasswordEncoder passwordEncoder, CookiesService cookiesService,
            AuthorizedEmailRepository authorizedEmailDAO) {
        this.userDAO = userDAO;
        this.oAuth2UserDAO = oAuth2UserDAO;
        this.jwtUtil = jwtUtil;
        this.authManager = authManager;
        this.passwordEncoder = passwordEncoder;
        this.cookiesService = cookiesService;
        this.authorizedEmailDAO = authorizedEmailDAO;
    }

    public Map<String, Object> getAuthenticatedUser() {
        Map<String, Object> userInfo = new HashMap<>();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        String email = ((CustomUserDetails) authentication.getPrincipal()).getEmail();
        Boolean isCoach = ((CustomUserDetails) authentication.getPrincipal()).getIsCoach();
        PlayerDTO player = ((CustomUserDetails) authentication.getPrincipal()).getPlayer();

        userInfo.put("username", username);
        userInfo.put("email", email);
        userInfo.put("isCoach", isCoach);
        userInfo.put("player", player);

        return userInfo;
    }

    public void signup(String userName, String email, String password, boolean isCoach) {
        User existingUser = userDAO.findByEmail(email);
        if (existingUser != null) {
            throw new RuntimeException("User already exists");
        } else {
            AuthorizedEmail authorizedEmail = authorizedEmailDAO.findByEmail(email);
            if (authorizedEmail != null) {
                User user = new User(userName, email, passwordEncoder.encode(password), isCoach,
                        authorizedEmail.getPlayer());
                userDAO.save(user);
            } else {
                throw new RuntimeException("User not authorized");
            }
        }

    }

    public String login(String username, String password, HttpServletResponse response) {
        User user = userDAO.findByUsername(username);
        if (user == null) {
            throw new RuntimeException("User does not exist");
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Incorrect password");
        } else {
            String jwt;
            if (user.getIsCoach()) {
                jwt = jwtUtil.generateJwtToken(user.getEmail(), "ROLE_COACH");
            } else {
                jwt = jwtUtil.generateJwtToken(user.getEmail(), "ROLE_PLAYER");
            }
            cookiesService.addHttpOnlyCookie("jwt", jwt, 30 * 60, response);
            return jwt;
        }
    }

    public void exit(HttpServletResponse response) {
        cookiesService.deleteCookie("jwt", response);
    }

    public void setIsCoach(boolean isCoach, String email, HttpServletResponse response) {
        User user = userDAO.findByEmail(email);

        if (user == null) {
            OAuth2User oAuth2User = oAuth2UserDAO.findByEmail(email);
            if (oAuth2User == null) {
                throw new RuntimeException("Usuario no registrado");
            }

            oAuth2UserDAO.setIsCoach(isCoach, email);
        }

        userDAO.setIsCoach(isCoach, email);

        String role = isCoach ? "ROLE_COACH" : "ROLE_PLAYER";
        String jwt = jwtUtil.generateJwtToken(email, role);
        cookiesService.addHttpOnlyCookie("jwt", jwt, 30 * 60, response);
    }
}