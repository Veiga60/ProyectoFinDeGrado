package com.ikerveiga.app.dto;

import java.util.List;

public class DebateDTO {

    private long id;
    private String title;
    List<MessageDTO> messages;

    public DebateDTO(long id, String title, List<MessageDTO> messages) {
        this.id = id;
        this.title = title;
        this.messages = messages;
    }

    public DebateDTO(String title, List<MessageDTO> messages) {
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

    public List<MessageDTO> getMessages() {
        return this.messages;
    }

    public void setMessages(List<MessageDTO> messages) {
        this.messages = messages;
    }
}
