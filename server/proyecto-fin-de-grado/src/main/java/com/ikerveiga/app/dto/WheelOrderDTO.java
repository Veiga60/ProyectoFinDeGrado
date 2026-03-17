package com.ikerveiga.app.dto;

import com.ikerveiga.app.enums.WheelHardness;
import com.ikerveiga.app.enums.WheelModel;

public class WheelOrderDTO extends PlayerOrderDTO {

    private WheelModel model;
    private WheelHardness hardness;
    private String size;
    private int amount;

    public WheelOrderDTO() {

    }

    public WheelOrderDTO(long id, PlayerDTO player, String phoneNumber, OrderDTO order, WheelModel model,
            WheelHardness hardness,
            String size,
            int amount) {
        super(id, player, phoneNumber, order);
        this.model = model;
        this.hardness = hardness;
        this.size = size;
        this.amount = amount;
    }

    public WheelOrderDTO(PlayerDTO player, String phoneNumber, OrderDTO order, WheelModel model, WheelHardness hardness,
            String size,
            int amount) {
        super(player, phoneNumber, order);
        this.model = model;
        this.hardness = hardness;
        this.size = size;
        this.amount = amount;
    }

    public WheelModel getModel() {
        return this.model;
    }

    public void setModel(WheelModel model) {
        this.model = model;
    }

    public WheelHardness getHardness() {
        return this.hardness;
    }

    public void setHardness(WheelHardness hardness) {
        this.hardness = hardness;
    }

    public String getSize() {
        return this.size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public int getAmount() {
        return this.amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }
}
