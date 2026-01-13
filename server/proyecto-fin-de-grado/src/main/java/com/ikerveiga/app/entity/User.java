package com.ikerveiga.app.entity;

import com.ikerveiga.app.dto.UserDTO;

import jakarta.persistence.*;

@Entity
@Table(name = "Users")
public class User {

    @Id
    @Column(name = "user_id", nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "user_Name", nullable = false, unique = true)
    private String userName;

    @Column(name = "user_email", nullable = false, unique = true)
    private String email;

    @Column(name = "user_password", nullable = true, unique = false)
    private String password;

    @Column(name = "user_isCoach", nullable = false, unique = false)
    private boolean isCoach;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "player_id", referencedColumnName = "player_id")
    private Player player;

    public User() {

    }

    public User(String userName, String email, String password, boolean isCoach, Player player) {
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.isCoach = isCoach;
        this.player = player;
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

    public Player getPlayer() {
        return this.player;
    }

    public UserDTO toDTO() {
        UserDTO userDTO = new UserDTO(this.id, this.userName, this.email, this.password, this.isCoach,
                this.player.toDTOWithoutStats());

        return userDTO;
    }
}
