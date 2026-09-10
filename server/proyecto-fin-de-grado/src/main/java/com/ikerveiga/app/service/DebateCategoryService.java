package com.ikerveiga.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.dao.DebateCategoryRepository;
import com.ikerveiga.app.entity.DebateCategory;

@Service
public class DebateCategoryService {
    
    private DebateCategoryRepository debateCategoryDAO;

    @Autowired
    public DebateCategoryService(DebateCategoryRepository debateCategoryDAO) {
        this.debateCategoryDAO = debateCategoryDAO;
    }

    public List<DebateCategory> getCategoriesOfClubTeam(long id) {
        List<DebateCategory> categories = debateCategoryDAO.findByClubTeamId(id);

        if (categories.isEmpty()) {
            throw new RuntimeException("Categories not found");
        }

        return categories;
    }
}
