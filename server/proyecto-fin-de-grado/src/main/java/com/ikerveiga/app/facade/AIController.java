package com.ikerveiga.app.facade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ikerveiga.app.service.AIService;

@RestController
public class AIController {

    private AIService aiService;

    @Autowired
    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @Secured("ROLE_COACH")
    @PostMapping("/ai/recomendations")
    public ResponseEntity<String> getRecomendations(@RequestBody String prompt) {
        try {
            String response = aiService.getRecomendations(prompt);
            System.out.println(response);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
