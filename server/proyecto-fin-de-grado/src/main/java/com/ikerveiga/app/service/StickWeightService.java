package com.ikerveiga.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.dao.StickWeightRepository;
import com.ikerveiga.app.entity.StickWeight;

@Service
public class StickWeightService {

    private StickWeightRepository stickWeightDAO;

    @Autowired
    public StickWeightService(StickWeightRepository stickWeightDAO) {
        this.stickWeightDAO = stickWeightDAO;
    }

    public List<StickWeight> getWeights() {
        List<StickWeight> weights = stickWeightDAO.findAll();

        if (weights.isEmpty()) {
            throw new RuntimeException("No weights found");
        }

        return weights;
    }
}
