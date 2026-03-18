package com.ikerveiga.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.dao.WheelHardnessRepository;
import com.ikerveiga.app.entity.WheelHardness;

@Service
public class WheelHardnessService {

    private WheelHardnessRepository wheelHardnessDAO;

    @Autowired
    public WheelHardnessService(WheelHardnessRepository wheelHardnessDAO) {
        this.wheelHardnessDAO = wheelHardnessDAO;
    }

    public List<WheelHardness> getWheelHardnesses() {
        List<WheelHardness> wheelHardnesses = wheelHardnessDAO.findAll();

        return wheelHardnesses;
    }
}
