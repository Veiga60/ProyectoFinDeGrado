package com.ikerveiga.app.dto;

public class UserDTO {

    private long id;
    private String userName;
    private String email;
    private String password;
    private boolean isCoach;
    private PlayerDTO playerDTO;

    public UserDTO() {

    }

    public UserDTO(long id, String userName, String email, String password, boolean isCoach, PlayerDTO playerDTO) {
        this.id = id;
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.isCoach = isCoach;
        this.playerDTO = playerDTO;
    }

    public long getId() {
        return this.id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
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
        return this.playerDTO;
    }

    public void setPlayerDTO(PlayerDTO playerDTO) {
        this.playerDTO = playerDTO;
    }

}
