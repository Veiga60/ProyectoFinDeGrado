package com.ikerveiga.app.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class CorsConfiguration {

    @Value("${app.client.url}")
    private String clientUrl;

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        org.springframework.web.cors.CorsConfiguration cors = new org.springframework.web.cors.CorsConfiguration();
        cors.setAllowCredentials(true);
        cors.addAllowedHeader("*");
        cors.addAllowedMethod("*");
        cors.addAllowedOrigin("http://127.0.0.1:5173");
        cors.addAllowedOrigin("http://localhost:5173");
        cors.addAllowedOrigin(clientUrl);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", cors);

        return source;
    }
}