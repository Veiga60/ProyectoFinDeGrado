package com.ikerveiga.app.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.dao.DebateRepository;
import com.ikerveiga.app.entity.Debate;
import com.ikerveiga.app.enums.DebateCategory;

@Service
public class DebateService {

    private DebateRepository debateDAO;

    @Autowired
    public DebateService(DebateRepository debateDAO) {
        this.debateDAO = debateDAO;
    }

    public void createDebate(String title, DebateCategory category) {
        Debate existingDebate = debateDAO.findByTitle(title);

        if (existingDebate != null) {
            throw new RuntimeException("Debate already exists");
        }

        Debate debate = new Debate(title, category, new ArrayList<>());

        debateDAO.save(debate);
    }

    public List<Debate> getDebatesOfCategory(DebateCategory category) {

        if (!Arrays.asList(DebateCategory.values()).contains(category)) {
            throw new RuntimeException("Category not found");
        }

        List<Debate> debates = debateDAO.findByCategory(category);

        return debates;
    }
}
