package com.ikerveiga.app.entity;

import java.time.LocalDate;
import java.time.LocalTime;

import com.ikerveiga.app.dto.MessageDTO;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Table(name = "messages")
@Entity
public class Message {

    @Id
    @Column(name = "message_id", nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "message_text", nullable = false, unique = false)
    String text;

    @Column(name = "message_date", nullable = false, unique = false)
    private LocalDate date;

    @Column(name = "message_time", nullable = false, unique = false)
    private LocalTime time;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "debate_id", referencedColumnName = "debate_id")
    private Debate debate;

    public Message() {

    }

    public Message(long id, String text, LocalDate date, LocalTime time, User user, Debate debate) {
        this.id = id;
        this.text = text;
        this.date = date;
        this.time = time;
        this.user = user;
        this.debate = debate;
    }

    public Message(String text, LocalDate date, LocalTime time, User user, Debate debate) {
        this.text = text;
        this.date = date;
        this.time = time;
        this.user = user;
        this.debate = debate;
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

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Debate getDebate() {
        return this.debate;
    }

    public void setDebate(Debate debate) {
        this.debate = debate;
    }

    public MessageDTO toDTO() {
        MessageDTO messageDTO = new MessageDTO(this.id, this.text, this.date, this.time, this.user.toDTO(),
                this.debate.toDTO());

        return messageDTO;
    }

    public MessageDTO toDTOWithoutDebate() {
        MessageDTO messageDTO = new MessageDTO(this.id, this.text, this.date, this.time, this.user.toDTO());

        return messageDTO;
    }

}
