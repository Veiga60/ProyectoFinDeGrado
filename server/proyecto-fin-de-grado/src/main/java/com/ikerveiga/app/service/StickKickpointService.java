package com.ikerveiga.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.dao.StickKickpointRepository;
import com.ikerveiga.app.entity.StickKickpoint;

@Service
public class StickKickpointService {

    private StickKickpointRepository stickKickpointDAO;

    @Autowired
    public StickKickpointService(StickKickpointRepository stickKickpointDAO) {
        this.stickKickpointDAO = stickKickpointDAO;
    }

    public List<StickKickpoint> getKickpoints() {
        List<StickKickpoint> kickpoints = stickKickpointDAO.findAll();

        if (kickpoints.isEmpty()) {
            throw new RuntimeException("No kickpoints found");
        }

        return kickpoints;
    }
}
