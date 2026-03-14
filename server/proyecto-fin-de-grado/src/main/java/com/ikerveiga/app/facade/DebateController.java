package com.ikerveiga.app.facade;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ikerveiga.app.dto.DebateDTO;
import com.ikerveiga.app.entity.Debate;
import com.ikerveiga.app.enums.DebateCategory;
import com.ikerveiga.app.service.DebateService;

@RestController
public class DebateController {

    private DebateService debateService;

    @Autowired
    public DebateController(DebateService debateService) {
        this.debateService = debateService;
    }

    @Secured("ROLE_COACH")
    @PostMapping("/debates")
    public ResponseEntity<Void> createDebate(@RequestBody DebateDTO debate) {
        try {
            debateService.createDebate(debate.getTitle(), debate.getCategory());
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("Debate already exists")) {
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }

    @GetMapping("/debates/categories/{category}")
    public ResponseEntity<List<DebateDTO>> getDebatesOfCategory(@PathVariable("category") DebateCategory category) {
        try {
            List<DebateDTO> debatesDTO = new ArrayList<>();
            List<Debate> debates = debateService.getDebatesOfCategory(category);

            for (Debate debate : debates) {
                debatesDTO.add(debate.toDTO());
            }

            return ResponseEntity.ok(debatesDTO);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("Category not found")) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }
}
