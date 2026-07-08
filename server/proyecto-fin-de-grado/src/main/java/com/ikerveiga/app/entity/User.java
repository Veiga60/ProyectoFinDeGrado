package com.ikerveiga.app.entity;

import com.ikerveiga.app.dto.PlayerDTO;
import com.ikerveiga.app.dto.UserDTO;

import jakarta.persistence.*;

@Entity
@Table(name = "Users")
@Inheritance(strategy = InheritanceType.JOINED)
public class User {

    @Id
    @Column(name = "user_id", nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected long id;

    @Column(name = "user_Name", nullable = false, unique = true)
    protected String username;

    @Column(name = "user_email", nullable = false, unique = true)
    protected String email;

    @Column(name = "user_password", nullable = true, unique = false)
    private String password;

    @Column(name = "user_isCoach", nullable = false, unique = false)
    protected boolean isCoach;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "player_id", referencedColumnName = "player_id")
    protected Player player;

    public User() {

    }

    public User(String username, String email, String password, boolean isCoach) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.isCoach = isCoach;
    }

    public User(String username, String email, String password, boolean isCoach, Player player) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.isCoach = isCoach;
        this.player = player;
    }

    public User(long id, String username) {
        this.id = id;
        this.username = username;
    }

    public User(long id, String username, String email, boolean isCoach, Player player) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.isCoach = isCoach;
        this.player = player;
    }

    public User(long id, String username, String email, boolean isCoach) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.isCoach = isCoach;
    }

    public User(String username, String email, boolean isCoach) {
        this.username = username;
        this.email = email;
        this.isCoach = isCoach;
    }

    public User(String username, String email, boolean isCoach, Player player) {
        this.username = username;
        this.email = email;
        this.isCoach = isCoach;
        this.player = player;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUsername() {
        return this.username;
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
        PlayerDTO playerDTO = null;

        if (this.player != null) {
            playerDTO = this.player.toDTOWithoutStats();
        }

        UserDTO userDTO = new UserDTO(this.id, this.username, this.email, this.password, this.isCoach,
                playerDTO);

        return userDTO;
    }
}
