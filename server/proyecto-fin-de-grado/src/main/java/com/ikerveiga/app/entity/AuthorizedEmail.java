package com.ikerveiga.app.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "authorized_emails")
public class AuthorizedEmail {

    @Id
    @Column(name = "id", nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @ManyToOne
    @JoinColumn(name = "player_id", nullable = true, unique = false)
    private Player player;

    @ManyToOne
    @JoinColumn(name = "club_id")
    private Club club;

    public AuthorizedEmail() {

    }

    public AuthorizedEmail(String email, Player player, Club club) {
        this.email = email;
        this.player = player;
        this.club = club;
    }

    public AuthorizedEmail(long id, String email, Player player, Club club) {
        this.id = id;
        this.email = email;
        this.player = player;
        this.club = club;
    }

    public long getId() {
        return this.id;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Player getPlayer() {
        return this.player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    public Club getClub() {
        return this.club;
    }

    public void setClub(Club club) {
        this.club = club;
    }
}
