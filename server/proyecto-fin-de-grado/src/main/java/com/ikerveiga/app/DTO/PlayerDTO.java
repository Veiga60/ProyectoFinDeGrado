package com.ikerveiga.app.DTO;

import java.util.List;

import com.ikerveiga.app.entity.Match;

public class PlayerDTO {

    private long id;
    private String name;
    private String lastName1;
    private String lastName2;
    private String photo;
    private List<Match> matches;

    public PlayerDTO(String name, String lastName1, String lastName2, String photo, List<Match> matches) {
        this.name = name;
        this.lastName1 = lastName1;
        this.lastName2 = lastName2;
        this.photo = photo;
        this.matches = matches;
    }

    public PlayerDTO(long id, String name, String lastName1, String lastName2, String photo, List<Match> matches) {
        this.id = id;
        this.name = name;
        this.lastName1 = lastName1;
        this.lastName2 = lastName2;
        this.photo = photo;
        this.matches = matches;
    }

    public long getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName1() {
        return this.lastName1;
    }

    public void setLastName1(String lastName1) {
        this.lastName1 = lastName1;
    }

    public String getLastName2() {
        return this.lastName2;
    }

    public void setLastName2(String lastName2) {
        this.lastName2 = lastName2;
    }

    public String getPhoto() {
        return this.photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public List<Match> getMatches() {
        return this.matches;
    }

    public void setMatches(List<Match> matches) {
        this.matches = matches;
    }
}
