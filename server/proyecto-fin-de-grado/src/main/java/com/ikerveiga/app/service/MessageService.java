package com.ikerveiga.app.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.dao.DebateRepository;
import com.ikerveiga.app.dao.MessageRepository;
import com.ikerveiga.app.entity.Debate;
import com.ikerveiga.app.entity.Message;
import com.ikerveiga.app.entity.User;

@Service
public class MessageService {

    private MessageRepository messageDAO;
    private DebateRepository debateDAO;

    @Autowired
    public MessageService(MessageRepository messageDAO, DebateRepository debateDAO) {
        this.messageDAO = messageDAO;
        this.debateDAO = debateDAO;
    }

    public void createMessage(String text, LocalDate date, LocalTime time, User user, long debateId) {
        Debate debate = debateDAO.findById(debateId);

        if (debate == null) {
            throw new RuntimeException("Debate does not exist");
        }

        Message message = new Message(text, date, time, user, debate);

        messageDAO.save(message);
    }

    public List<Message> getMessagesOfDebate(long debateId) {
        Debate debate = debateDAO.findById(debateId);

        if (debate == null) {
            throw new RuntimeException("Debate does not exist");
        }

        List<Message> messages = messageDAO.findByDebate(debate);

        return messages;
    }
}
