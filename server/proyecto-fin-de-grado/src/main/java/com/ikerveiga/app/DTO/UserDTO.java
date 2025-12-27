package com.ikerveiga.app.DTO;

public class UserDTO {

    private long id;
    private String userName;
    private String email;
    private String password;
    private boolean isCoach;

    public UserDTO(long id, String userName, String email, String password, boolean isCoach) {
        this.id = id;
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.isCoach = isCoach;
    }

    public long getId() {
        return this.id;
    }

    public String getUserName() {
        return userName;
    }

    public void setName(String userName) {
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

}
