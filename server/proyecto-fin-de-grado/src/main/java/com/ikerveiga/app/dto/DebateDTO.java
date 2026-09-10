package com.ikerveiga.app.dto;

import java.util.ArrayList;
import java.util.List;

public class DebateDTO {

    private long id;
    private String title;
    private DebateCategoryDTO category;
    List<MessageDTO> messages;

    public DebateDTO() {

    }

    public DebateDTO(long id, String title, DebateCategoryDTO category, List<MessageDTO> messages) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.messages = messages;
    }

    public DebateDTO(String title, DebateCategoryDTO category, List<MessageDTO> messages) {
        this.title = title;
        this.category = category;
        this.messages = messages;
    }

    public DebateDTO(String title, DebateCategoryDTO category) {
        this.title = title;
        this.category = category;
        this.messages = new ArrayList<>();
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

    public DebateCategoryDTO getCategory() {
        return this.category;
    }

    public void setCategory(DebateCategoryDTO category) {
        this.category = category;
    }

    public List<MessageDTO> getMessages() {
        return this.messages;
    }

    public void setMessages(List<MessageDTO> messages) {
        this.messages = messages;
    }
}
