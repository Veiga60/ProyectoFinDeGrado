package com.ikerveiga.app.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.dao.DebateRepository;
import com.ikerveiga.app.dao.MessageRepository;
import com.ikerveiga.app.dao.OAuth2UserRepository;
import com.ikerveiga.app.dao.UserRepository;
import com.ikerveiga.app.entity.Debate;
import com.ikerveiga.app.entity.Message;
import com.ikerveiga.app.entity.User;

@Service
public class MessageService {

    private MessageRepository messageDAO;
    private DebateRepository debateDAO;
    private UserRepository userDAO;
    private OAuth2UserRepository oAuth2UserDAO;

    @Autowired
    public MessageService(MessageRepository messageDAO, DebateRepository debateDAO, UserRepository userDAO,
            OAuth2UserRepository oAuth2UserDAO) {
        this.messageDAO = messageDAO;
        this.debateDAO = debateDAO;
        this.userDAO = userDAO;
        this.oAuth2UserDAO = oAuth2UserDAO;
    }

    public void createMessage(String text, String userEmail, long debateId) {
        Debate debate = debateDAO.findById(debateId);
        User user = userDAO.findByEmail(userEmail);

        if (user == null) {
            user = oAuth2UserDAO.findByEmail(userEmail);
            if (user == null) {
                throw new RuntimeException("User not registered");
            }
        }

        if (debate == null) {
            throw new RuntimeException("Debate does not exist");
        }

        Message message = new Message(text, LocalDate.now(), LocalTime.now(), user, debate);

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
