package com.ikerveiga.app.OAuth2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.JWT.JwtUtil;
import com.ikerveiga.app.cookies.CookiesService;

import jakarta.servlet.http.HttpServletResponse;

@Service
public class OAuth2Service {

    JwtUtil jwtUtil;
    CookiesService cookiesService;

    @Autowired
    public OAuth2Service(JwtUtil jwtUtil, CookiesService cookiesService) {
        this.jwtUtil = jwtUtil;
        this.cookiesService = cookiesService;
    }

    public String handleLoginSuccess(String username, HttpServletResponse response) {
        String jwt = jwtUtil.generateJwtToken(username);
        cookiesService.addHttpOnlyCookie("jwt", jwt, 7 * 24 * 60 * 60, response);
        return jwt;
    }
}
