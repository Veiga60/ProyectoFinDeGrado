package com.ikerveiga.app.service;

import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AIService {

        private OllamaChatModel chatModel;

        @Autowired
        public AIService(OllamaChatModel chatModel) {
                this.chatModel = chatModel;
        }

        public String getRecomendations(String data) {
                String response = chatModel.call(data);

                return response;
        }
}
