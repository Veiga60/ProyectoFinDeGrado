package com.ikerveiga.app.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class MessageDTO {

    private long id;
    private String text;
    private LocalDate date;
    private LocalTime time;
    private UserDTO user;
    private DebateDTO debate;

    public MessageDTO() {

    }

    public MessageDTO(long id, String text, LocalDate date, LocalTime time, UserDTO user, DebateDTO debate) {
        this.id = id;
        this.text = text;
        this.date = date;
        this.time = time;
        this.user = user;
        this.debate = debate;
    }

    public MessageDTO(long id, String text, LocalDate date, LocalTime time, UserDTO user) {
        this.id = id;
        this.text = text;
        this.date = date;
        this.time = time;
        this.user = user;
    }

    public MessageDTO(String text, LocalDate date, LocalTime time, UserDTO user, DebateDTO debate) {
        this.text = text;
        this.date = date;
        this.time = time;
        this.user = user;
        this.debate = debate;
    }

    public MessageDTO(String text, UserDTO user) {
        this.text = text;
        this.user = user;
    }

    public long getId() {
        return this.id;
    }

    public String getText() {
        return this.text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public LocalDate getDate() {
        return this.date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getTime() {
        return this.time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public UserDTO getUser() {
        return this.user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public DebateDTO getDebate() {
        return this.debate;
    }

    public void setDebate(DebateDTO debate) {
        this.debate = debate;
    }
}
