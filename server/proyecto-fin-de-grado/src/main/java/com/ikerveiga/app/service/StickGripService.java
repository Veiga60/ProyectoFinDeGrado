package com.ikerveiga.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.dao.StickGripRepository;
import com.ikerveiga.app.entity.StickGrip;

@Service
public class StickGripService {

    private StickGripRepository stickGripDAO;

    @Autowired
    public StickGripService(StickGripRepository stickGripDAO) {
        this.stickGripDAO = stickGripDAO;
    }

    public List<StickGrip> getGrips() {
        List<StickGrip> grips = stickGripDAO.findAll();

        if (grips.isEmpty()) {
            throw new RuntimeException("No grips found");
        }

        return grips;
    }
}
