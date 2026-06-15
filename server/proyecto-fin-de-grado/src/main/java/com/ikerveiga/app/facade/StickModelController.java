package com.ikerveiga.app.facade;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ikerveiga.app.dto.StickModelDTO;
import com.ikerveiga.app.entity.StickModel;
import com.ikerveiga.app.service.StickModelService;

@RestController
public class StickModelController {

    private StickModelService stickModelService;

    @Autowired
    public StickModelController(StickModelService stickModelService) {
        this.stickModelService = stickModelService;
    }

    @GetMapping("stickModels/all")
    public ResponseEntity<List<StickModelDTO>> getModels() {
        try {
            List<StickModelDTO> modelsDTO = new ArrayList<>();
            List<StickModel> models = stickModelService.getModels();

            for (StickModel model : models) {
                modelsDTO.add(model.toDTO());
            }

            return ResponseEntity.ok(modelsDTO);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("No models found")) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }
}
