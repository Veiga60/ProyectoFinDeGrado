package com.ikerveiga.app.dto;

public class OAuth2UserDTO {

    private long id;
    private String username;
    private String email;
    private boolean isCoach;
    private PlayerDTO playerDTO;

    public OAuth2UserDTO() {

    }

    public OAuth2UserDTO(long id, String username, String email, boolean isCoach, PlayerDTO playerDTO) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.isCoach = isCoach;
        this.playerDTO = playerDTO;
    }

    public OAuth2UserDTO(String username, String email, boolean isCoach) {
        this.username = username;
        this.email = email;
        this.isCoach = isCoach;
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

    public PlayerDTO getPlayerDTO() {
        return this.playerDTO;
    }

    public void setPlayerDTO(PlayerDTO playerDTO) {
        this.playerDTO = playerDTO;
    }

}
