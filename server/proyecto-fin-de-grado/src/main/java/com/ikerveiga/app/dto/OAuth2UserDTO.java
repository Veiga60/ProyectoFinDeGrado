package com.ikerveiga.app.dto;

public class OAuth2UserDTO extends UserDTO {

    public OAuth2UserDTO() {
        super();
    }

    public OAuth2UserDTO(long id, String username, String email, boolean isCoach, PlayerDTO playerDTO) {
        super(id, username, email, isCoach, playerDTO);
    }

    public OAuth2UserDTO(String username, String email, boolean isCoach) {
        super(username, email, isCoach, null);
    }
}
