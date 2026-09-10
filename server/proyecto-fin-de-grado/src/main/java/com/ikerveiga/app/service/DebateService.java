package com.ikerveiga.app.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.dao.DebateRepository;
import com.ikerveiga.app.dao.DebateCategoryRepository;
import com.ikerveiga.app.entity.Debate;
import com.ikerveiga.app.entity.DebateCategory;

@Service
public class DebateService {

    private DebateRepository debateDAO;
    private DebateCategoryRepository debateCategoryDAO;

    @Autowired
    public DebateService(DebateRepository debateDAO, DebateCategoryRepository debateCategoryDAO) {
        this.debateDAO = debateDAO;
        this.debateCategoryDAO = debateCategoryDAO;
    }

    public void createDebate(String title, long categoryId) {
        Debate existingDebate = debateDAO.findByTitle(title);

        DebateCategory category = debateCategoryDAO.findById(categoryId);

        if (category == null) {
            throw new RuntimeException("Category not found");
        }

        if (existingDebate != null) {
            throw new RuntimeException("Debate already exists");
        }

        Debate debate = new Debate(title, category, new ArrayList<>());

        debateDAO.save(debate);
    }

    public List<Debate> getDebatesOfCategory(long id) {

        DebateCategory category = debateCategoryDAO.findById(id);

        if (category == null) {
            throw new RuntimeException("Category not found");
        }

        List<Debate> debates = debateDAO.findByCategory(category);

        return debates;
    }
}
