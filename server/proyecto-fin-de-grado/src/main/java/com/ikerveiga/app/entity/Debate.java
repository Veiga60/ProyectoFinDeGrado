package com.ikerveiga.app.entity;

import java.util.ArrayList;
import java.util.List;

import com.ikerveiga.app.dto.DebateDTO;
import com.ikerveiga.app.dto.MessageDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Table(name = "debates")
@Entity
public class Debate {

    @Id
    @Column(name = "debate_id", nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "debate_title", nullable = false, unique = false)
    private String title;

    @OneToMany(mappedBy = "debate")
    List<Message> messages;

    public Debate() {

    }

    public Debate(long id, String title, List<Message> messages) {
        this.id = id;
        this.title = title;
        this.messages = messages;
    }

    public Debate(String title, List<Message> messages) {
        this.title = title;
        this.messages = messages;
    }

    public long getId() {
        return this.id;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<Message> getMessages() {
        return this.messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    public DebateDTO toDTO() {
        List<MessageDTO> messagesDTO = new ArrayList<>();
        for (Message message : this.getMessages()) {
            messagesDTO.add(message.toDTOWithoutDebate());
        }

        DebateDTO debateDTO = new DebateDTO(this.id, this.title, messagesDTO);

        return debateDTO;
    }
}
