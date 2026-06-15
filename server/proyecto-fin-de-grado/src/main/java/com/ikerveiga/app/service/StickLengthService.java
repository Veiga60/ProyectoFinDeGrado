package com.ikerveiga.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.dao.StickLengthRepository;
import com.ikerveiga.app.entity.StickLength;

@Service
public class StickLengthService {

    private StickLengthRepository stickLengthDAO;

    @Autowired
    public StickLengthService(StickLengthRepository stickLengthDAO) {
        this.stickLengthDAO = stickLengthDAO;
    }

    public List<StickLength> getLengths() {
        List<StickLength> lengths = stickLengthDAO.findAll();

        if (lengths.isEmpty()) {
            throw new RuntimeException("No lengths found");
        }

        return lengths;
    }
}
