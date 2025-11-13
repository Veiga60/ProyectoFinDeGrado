package com.ikerveiga.app.DTO;

public class UserDTO {
    
    private String name;
    private String email;
    private String password;
    private boolean isCoach;

    public UserDTO(String name, String email, String password, boolean isCoach) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.isCoach = isCoach;
    }
        
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
