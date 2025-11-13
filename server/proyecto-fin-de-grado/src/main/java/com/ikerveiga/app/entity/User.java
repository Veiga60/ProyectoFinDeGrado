package com.ikerveiga.app.entity;

import jakarta.persistence.*;


@Entity
@Table(name = "Users")
public class User {

    @Id
    @Column(name = "user_id", nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "user_name", nullable = false, unique = false)
    private String name;

    @Column(name = "user_email", nullable = false, unique = true)
    private String email;

    @Column(name = "user_password", nullable = false, unique = false)
    private String password;

    @Column(name = "user_isCoach", nullable = false, unique = false)
    private boolean isCoach;

    public User() {
        
    }

    public User(String name, String email, String password, boolean isCoach) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.isCoach = isCoach;
    }

    public void setUserName(String userName) {
        this.name = userName;
    }

    public String getUserName() {
        return this.name;
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
