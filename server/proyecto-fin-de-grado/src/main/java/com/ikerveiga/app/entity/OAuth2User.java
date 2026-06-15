package com.ikerveiga.app.entity;

import com.ikerveiga.app.dto.OAuth2UserDTO;
import com.ikerveiga.app.dto.PlayerDTO;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "oauth2users")
public class OAuth2User extends User {

    public OAuth2User() {
    }

    public OAuth2User(long id, String username, String email, boolean isCoach, Player player) {
        super(id, username, email, isCoach, player);
    }

    public OAuth2User(String username, String email, boolean isCoach, Player player) {
        super(username, email, isCoach, player);
    }

    public OAuth2UserDTO toDTO() {
        PlayerDTO playerDTO = null;

        if (this.player != null) {
            playerDTO = this.player.toDTOWithoutStats();
        }

        OAuth2UserDTO oAuth2UserDTO = new OAuth2UserDTO(this.id, this.username, this.email, this.isCoach,
                playerDTO);

        return oAuth2UserDTO;
    }

}
