package com.ikerveiga.app.facade;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ikerveiga.app.dto.MessageDTO;
import com.ikerveiga.app.entity.Message;
import com.ikerveiga.app.service.MessageService;

@RestController
public class MessageController {

    private MessageService messageService;

    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping("/debates/{debateId}/messages")
    public ResponseEntity<Void> createMessage(@RequestBody MessageDTO message,
            @PathVariable("debateId") long debateId) {
        try {
            messageService.createMessage(message.getText(), message.getUser().getEmail(),
                    debateId);

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("Debate does not exist")) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }

    @GetMapping("/debates/{debateId}/messages")
    public ResponseEntity<List<MessageDTO>> getMessagesOfDebate(@PathVariable("debateId") long debateId) {
        try {
            List<MessageDTO> messagesDTO = new ArrayList<>();
            List<Message> messages = messageService.getMessagesOfDebate(debateId);

            for (Message message : messages) {
                messagesDTO.add(message.toDTOWithoutDebate());
            }

            return ResponseEntity.ok(messagesDTO);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("Debate does not exist")) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }

}
