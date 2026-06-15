package com.ikerveiga.app.service;

import org.springframework.ai.anthropic.AnthropicChatModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AIService {

        private AnthropicChatModel chatModel;

        @Autowired
        public AIService(AnthropicChatModel chatModel) {
                this.chatModel = chatModel;
        }

        public String getRecomendations(String data) {
                String response = chatModel.call(data);

                return response;
        }
}
