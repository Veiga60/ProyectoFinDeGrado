package com.ikerveiga.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.dao.StickFlexRepository;
import com.ikerveiga.app.entity.StickFlex;

@Service
public class StickFlexService {

    private StickFlexRepository stickFlexDAO;

    @Autowired
    public StickFlexService(StickFlexRepository stickFlexDAO) {
        this.stickFlexDAO = stickFlexDAO;
    }

    public List<StickFlex> getFlexes() {
        List<StickFlex> flexes = stickFlexDAO.findAll();

        if (flexes.isEmpty()) {
            throw new RuntimeException("No flexes found");
        }

        return flexes;
    }
}
