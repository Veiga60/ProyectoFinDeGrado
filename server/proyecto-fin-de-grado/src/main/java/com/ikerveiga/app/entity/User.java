package com.ikerveiga.app.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Users")
public class User {

    @Id
    @Column(name = "user_id", nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "user_firstName", nullable = false, unique = false)
    private String userName;

    @Column(name = "user_email", nullable = false, unique = true)
    private String email;

    @Column(name = "user_password", nullable = false, unique = false)
    private String password;

    @Column(name = "user_isCoach", nullable = false, unique = false)
    private boolean isCoach;

    public User(String userName, String email, String password, boolean isCoach) {
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.isCoach = isCoach;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserName() {
        return this.userName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return this.email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPassword() {
        return this.password;
    }

    public void setIsCoach(boolean isCoach) {
        this.isCoach = isCoach;
    }

    public boolean getIsCoach() {
        return this.isCoach;
    }

}
