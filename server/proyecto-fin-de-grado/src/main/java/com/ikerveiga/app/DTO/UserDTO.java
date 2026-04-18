package com.ikerveiga.app.dto;

public class UserDTO {

    protected long id;
    protected String username;
    protected String email;
    private String password;
    protected boolean isCoach;
    protected PlayerDTO player;

    public UserDTO() {

    }

    public UserDTO(long id, String username, String email, String password, boolean isCoach, PlayerDTO playerDTO) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.isCoach = isCoach;
        this.player = playerDTO;
    }

    public UserDTO(long id, String username, String email, boolean isCoach, PlayerDTO playerDTO) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.isCoach = isCoach;
        this.player = playerDTO;
    }

    public UserDTO(String username, String email, boolean isCoach, PlayerDTO playerDTO) {
        this.username = username;
        this.email = email;
        this.isCoach = isCoach;
        this.player = playerDTO;
    }

    public long getId() {
        return this.id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean getIsCoach() {
        return isCoach;
    }

    public void setIsCoach(boolean isCoach) {
        this.isCoach = isCoach;
    }

    public PlayerDTO getPlayerDTO() {
        return this.player;
    }

    public void setPlayerDTO(PlayerDTO playerDTO) {
        this.player = playerDTO;
    }

}
