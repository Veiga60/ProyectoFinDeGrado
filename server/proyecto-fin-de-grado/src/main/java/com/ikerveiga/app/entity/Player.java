package com.ikerveiga.app.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "players")
public class Player {
    
    @Id
    @Column(name = "player_id", nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "player_name", nullable = false, unique = false)
    private String name;

    @Column(name = "player_lastName_1", nullable = false, unique = false)
    private String lastName1;

    @Column(name = "player_lastName_2", nullable = false, unique = false)
    private String lastName2;

    @Column(name = "player_image", nullable = true, unique = false)
    private String image;

    public Player() {
        
    }

    public Player(String name, String lastName1, String lastName2, String image) {
        this.name = name;
        this.lastName1 = lastName1;
        this.lastName2 = lastName2;
        this.image = image;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName1() {
        return this.name;
    }

    public void setLastName1(String lastName1) {
        this.lastName1 = lastName1;
    }

    public String getLastName2() {
        return this.name;
    }

    public void setLastName2(String lastName2) {
        this.lastName2 = lastName2;
    }

    public String getImage() {
        return this.image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
