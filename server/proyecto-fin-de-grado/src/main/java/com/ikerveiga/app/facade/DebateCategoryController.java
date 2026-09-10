package com.ikerveiga.app.facade;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.ikerveiga.app.service.DebateCategoryService;
import com.ikerveiga.app.dto.DebateCategoryDTO;
import com.ikerveiga.app.entity.DebateCategory;


@RestController
public class DebateCategoryController {
    
    private DebateCategoryService debateCategoryService;

    @Autowired 
    public DebateCategoryController(DebateCategoryService debateCategoryService) {
        this.debateCategoryService = debateCategoryService;
    }

    @GetMapping("/categories/clubTeams/{id}")
    public ResponseEntity<List<DebateCategoryDTO>> getCategoriesOfClubTeam(@PathVariable("id") long id) {
        try {
            List<DebateCategoryDTO> categoriesDTO = new ArrayList<>();
            List<DebateCategory> categories = debateCategoryService.getCategoriesOfClubTeam(id);

            for(DebateCategory category : categories) {
                categoriesDTO.add(category.toDTOWithoutDebates());
            }

            return ResponseEntity.ok(categoriesDTO);
        } catch (RuntimeException e) {
            if(e.getMessage().equals("Categories not found")) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }
}
