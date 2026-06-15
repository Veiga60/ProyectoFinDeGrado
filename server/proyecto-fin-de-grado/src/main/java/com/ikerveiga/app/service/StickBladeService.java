package com.ikerveiga.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.dao.StickBladeRepository;
import com.ikerveiga.app.entity.StickBlade;

@Service
public class StickBladeService {

    private StickBladeRepository stickBladeDAO;

    @Autowired
    public StickBladeService(StickBladeRepository stickBladeDAO) {
        this.stickBladeDAO = stickBladeDAO;
    }

    public List<StickBlade> getBlades() {
        List<StickBlade> blades = stickBladeDAO.findAll();

        if (blades.isEmpty()) {
            throw new RuntimeException("No blades found");
        }

        return blades;
    }
}
