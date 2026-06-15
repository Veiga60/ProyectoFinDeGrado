package com.ikerveiga.app.dto;

public class StickOrderDTO extends PlayerOrderDTO {

    private StickModelDTO model;
    private StickLengthDTO length;
    private StickWeightDTO weight;
    private String side;
    private StickBladeDTO blade;
    private StickFlexDTO flex;
    private StickKickpointDTO kickpoint;
    private StickGripDTO grip;
    private int amount;
    private String nametag;

    public StickOrderDTO() {

    }

    public StickOrderDTO(long id, PlayerDTO player, String phoneNumber, OrderDTO order, StickModelDTO model,
            StickLengthDTO length,
            StickWeightDTO weight, String side, StickBladeDTO blade,
            StickFlexDTO flex, StickKickpointDTO kickpoint, StickGripDTO grip, int amount, String nametag) {
        super(id, player, phoneNumber, order);
        this.model = model;
        this.length = length;
        this.weight = weight;
        this.side = side;
        this.blade = blade;
        this.flex = flex;
        this.kickpoint = kickpoint;
        this.grip = grip;
        this.amount = amount;
        this.nametag = nametag;
    }

    public StickOrderDTO(PlayerDTO player, String phoneNumber, OrderDTO order, StickModelDTO model,
            StickLengthDTO length,
            StickWeightDTO weight, String side, StickBladeDTO blade,
            StickFlexDTO flex, StickKickpointDTO kickpoint, StickGripDTO grip, int amount, String nametag) {
        super(player, phoneNumber, order);
        this.model = model;
        this.length = length;
        this.weight = weight;
        this.side = side;
        this.blade = blade;
        this.flex = flex;
        this.kickpoint = kickpoint;
        this.grip = grip;
        this.amount = amount;
        this.nametag = nametag;
    }

    public StickModelDTO getModel() {
        return this.model;
    }

    public void setModel(StickModelDTO model) {
        this.model = model;
    }

    public StickLengthDTO getLength() {
        return this.length;
    }

    public void setLength(StickLengthDTO length) {
        this.length = length;
    }

    public StickWeightDTO getWeight() {
        return this.weight;
    }

    public void setWeight(StickWeightDTO weight) {
        this.weight = weight;
    }

    public String getSide() {
        return this.side;
    }

    public void setSide(String side) {
        this.side = side;
    }

    public StickBladeDTO getBlade() {
        return this.blade;
    }

    public void setBlade(StickBladeDTO blade) {
        this.blade = blade;
    }

    public StickFlexDTO getFlex() {
        return this.flex;
    }

    public void setFlex(StickFlexDTO flex) {
        this.flex = flex;
    }

    public StickKickpointDTO getKickpoint() {
        return this.kickpoint;
    }

    public void setKickpoint(StickKickpointDTO kickpoint) {
        this.kickpoint = kickpoint;
    }

    public StickGripDTO getGrip() {
        return this.grip;
    }

    public void setGrip(StickGripDTO grip) {
        this.grip = grip;
    }

    public int getAmount() {
        return this.amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getNametag() {
        return this.nametag;
    }

    public void setNametag(String nametag) {
        this.nametag = nametag;
    }
}
