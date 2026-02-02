package com.ikerveiga.app.entity;

import com.ikerveiga.app.dto.OAuth2UserDTO;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "oauth2users")
public class OAuth2User {

    @Id
    @Column(name = "id", nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "user_name", nullable = false, unique = true)
    private String username;

    @Column(name = "user_email", nullable = false, unique = true)
    private String email;

    @Column(name = "user_isCoach", nullable = false, unique = true)
    private boolean isCoach;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "player_id", referencedColumnName = "player_id")
    private Player player;

    public OAuth2User() {

    }

    public OAuth2User(String username, String email, boolean isCoach, Player player) {
        this.username = username;
        this.email = email;
        this.isCoach = isCoach;
        this.player = player;
    }

    public long getId() {
        return this.id;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean getIsCoach() {
        return this.isCoach;
    }

    public void setIsCoach(boolean isCoach) {
        this.isCoach = isCoach;
    }

    public Player getPlayer() {
        return this.player;
    }

    public OAuth2UserDTO toDTO() {
        OAuth2UserDTO oAuth2UserDTO = new OAuth2UserDTO(this.id, this.username, this.email, this.isCoach,
                this.player.toDTOWithoutStats());

        return oAuth2UserDTO;
    }

}
