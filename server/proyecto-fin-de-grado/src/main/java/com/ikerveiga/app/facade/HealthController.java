package com.ikerveiga.app.facade;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/health")
    private ResponseEntity<String> checkHealth() {
        return ResponseEntity.ok("healthy");
    }
}
