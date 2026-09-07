package com.ikerveiga.app.OAuth2;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.JWT.JwtUtil;
import com.ikerveiga.app.cookies.CookiesService;
import com.ikerveiga.app.dao.AuthorizedEmailRepository;
import com.ikerveiga.app.dao.OAuth2UserRepository;
import com.ikerveiga.app.dao.UserRepository;
import com.ikerveiga.app.entity.AuthorizedEmail;
import com.ikerveiga.app.entity.OAuth2User;
import com.ikerveiga.app.entity.User;

import jakarta.servlet.http.HttpServletResponse;

@Service
public class OAuth2Service {

    @Value("${app.client.url}")
    private String clientUrl;

    JwtUtil jwtUtil;
    CookiesService cookiesService;
    UserRepository userRepository;
    OAuth2UserRepository oAuth2UserDAO;
    AuthorizedEmailRepository authorizedEmailDAO;

    @Autowired
    public OAuth2Service(JwtUtil jwtUtil, CookiesService cookiesService, UserRepository userRepository,
            OAuth2UserRepository oAuth2UserDAO, AuthorizedEmailRepository authorizedEmailDAO) {
        this.jwtUtil = jwtUtil;
        this.cookiesService = cookiesService;
        this.userRepository = userRepository;
        this.oAuth2UserDAO = oAuth2UserDAO;
        this.authorizedEmailDAO = authorizedEmailDAO;
    }

    public String handleLoginSuccess(String username, String email, HttpServletResponse response) {
        User existingUser = userRepository.findByEmail(email);

        boolean isNewUser = (existingUser == null);
        String url = isNewUser ? (clientUrl + "/select_role") : (clientUrl + "/home");

        if (existingUser == null) {
            AuthorizedEmail authorizedEmail = authorizedEmailDAO.findByEmail(email);
            if (authorizedEmail != null) {
                OAuth2User user = new OAuth2User(username, email, false, authorizedEmail.getPlayer());
                oAuth2UserDAO.save(user);
                existingUser = user;
            } else {
                throw new RuntimeException("Usuario no autorizado");
            }
        }

        String jwt;
        if (existingUser.getIsCoach()) {
            jwt = jwtUtil.generateJwtToken(email, "ROLE_COACH");
        } else {
            jwt = jwtUtil.generateJwtToken(email, "ROLE_PLAYER");
        }
        cookiesService.addHttpOnlyCookie("jwt", jwt, 30 * 60, response);
        try {
            response.sendRedirect(url);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return jwt;
    }
}
