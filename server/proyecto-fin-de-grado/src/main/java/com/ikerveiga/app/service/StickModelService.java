package com.ikerveiga.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.dao.StickModelRepository;
import com.ikerveiga.app.entity.StickModel;

@Service
public class StickModelService {

    private StickModelRepository stickModelDAO;

    @Autowired
    public StickModelService(StickModelRepository stickModelDAO) {
        this.stickModelDAO = stickModelDAO;
    }

    public List<StickModel> getModels() {
        List<StickModel> models = stickModelDAO.findAll();

        if (models.isEmpty()) {
            throw new RuntimeException("No models found");
        }

        return models;
    }
}
