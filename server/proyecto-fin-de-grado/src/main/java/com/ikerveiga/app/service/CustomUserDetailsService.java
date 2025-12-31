package com.ikerveiga.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.DAO.UserRepository;
import com.ikerveiga.app.entity.User;

import io.jsonwebtoken.lang.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    UserRepository userDAO;

    @Autowired
    public CustomUserDetailsService(UserRepository userDAO) {
        this.userDAO = userDAO;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userDAO.findByUserName(username);
        if (user == null) {
            throw new UsernameNotFoundException("Ususario con nombre " + username + " no encontrado.");
        }

        String password = null;

        if (user.getPassword() != null) {
            password = user.getPassword();
        } else {
            password = "";
        }

        return new org.springframework.security.core.userdetails.User(
                user.getUserName(),
                password,
                Collections.emptyList());
    }

}
