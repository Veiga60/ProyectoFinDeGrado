package com.ikerveiga.app;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import com.ikerveiga.app.dto.PlayerDTO;

public class CustomUserDetails extends User {

    private String email;
    private boolean isCoach;
    private PlayerDTO player;

    public CustomUserDetails(String username, String email, String password, boolean isCoach, PlayerDTO player,
            Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);
        this.email = email;
        this.isCoach = isCoach;
        this.player = player;
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

    public PlayerDTO getPlayer() {
        return this.player;
    }

    public void setPlayer(PlayerDTO player) {
        this.player = player;
    }
}
