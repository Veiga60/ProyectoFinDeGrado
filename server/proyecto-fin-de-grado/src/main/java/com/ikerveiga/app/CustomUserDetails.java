package com.ikerveiga.app;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

public class CustomUserDetails extends User {

    private String email;
    private boolean isCoach;

    public CustomUserDetails(String username, String email, String password, boolean isCoach,
            Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);
        this.email = email;
        this.isCoach = isCoach;
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

}
