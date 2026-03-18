package com.ikerveiga.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.dao.WheelSizeRepository;
import com.ikerveiga.app.entity.WheelSize;

@Service
public class WheelSizeService {

    private WheelSizeRepository wheelSizeDAO;

    @Autowired
    public WheelSizeService(WheelSizeRepository wheelSizeDAO) {
        this.wheelSizeDAO = wheelSizeDAO;
    }

    public List<WheelSize> getWheelSizes() {
        List<WheelSize> wheelHardnesses = wheelSizeDAO.findAll();

        return wheelHardnesses;
    }
}
