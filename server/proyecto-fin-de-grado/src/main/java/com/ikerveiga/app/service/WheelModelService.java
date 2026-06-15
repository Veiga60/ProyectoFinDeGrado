package com.ikerveiga.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.dao.WheelModelRepository;
import com.ikerveiga.app.entity.WheelModel;

@Service
public class WheelModelService {

    private WheelModelRepository wheelModelDAO;

    @Autowired
    public WheelModelService(WheelModelRepository wheelModelDAO) {
        this.wheelModelDAO = wheelModelDAO;
    }

    public List<WheelModel> getWheelModels() {
        List<WheelModel> wheelModels = wheelModelDAO.findAll();

        return wheelModels;
    }
}
