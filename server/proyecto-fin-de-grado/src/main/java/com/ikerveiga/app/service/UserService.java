package com.ikerveiga.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.entity.User;
import com.ikerveiga.app.DAO.UserRepository;

@Service
public class UserService {

    UserRepository userDAO;

    @Autowired
    public UserService(UserRepository userDAO) {
        this.userDAO = userDAO;
    }

    public void signup(String name, String email, String password, boolean isCoach) {
        User existingUser = userDAO.findByEmail(email);
        if(existingUser != null) {
            throw new RuntimeException("User already exists");
        }

        User user = new User(name, email, password, isCoach);
        userDAO.save(user);
    }
}