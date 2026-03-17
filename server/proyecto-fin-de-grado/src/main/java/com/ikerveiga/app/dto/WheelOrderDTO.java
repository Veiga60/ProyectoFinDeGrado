package com.ikerveiga.app.dto;

public class WheelOrderDTO extends PlayerOrderDTO {

    private WheelModelDTO model;
    private WheelHardnessDTO hardness;
    private WheelSizeDTO size;
    private int amount;

    public WheelOrderDTO() {

    }

    public WheelOrderDTO(long id, PlayerDTO player, String phoneNumber, OrderDTO order, WheelModelDTO model,
            WheelHardnessDTO hardness,
            WheelSizeDTO size,
            int amount) {
        super(id, player, phoneNumber, order);
        this.model = model;
        this.hardness = hardness;
        this.size = size;
        this.amount = amount;
    }

    public WheelOrderDTO(PlayerDTO player, String phoneNumber, OrderDTO order, WheelModelDTO model,
            WheelHardnessDTO hardness,
            WheelSizeDTO size,
            int amount) {
        super(player, phoneNumber, order);
        this.model = model;
        this.hardness = hardness;
        this.size = size;
        this.amount = amount;
    }

    public WheelModelDTO getModel() {
        return this.model;
    }

    public void setModel(WheelModelDTO model) {
        this.model = model;
    }

    public WheelHardnessDTO getHardness() {
        return this.hardness;
    }

    public void setHardness(WheelHardnessDTO hardness) {
        this.hardness = hardness;
    }

    public WheelSizeDTO getSize() {
        return this.size;
    }

    public void setSize(WheelSizeDTO size) {
        this.size = size;
    }

    public int getAmount() {
        return this.amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }
}
