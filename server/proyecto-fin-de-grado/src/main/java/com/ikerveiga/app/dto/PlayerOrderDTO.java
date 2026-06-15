package com.ikerveiga.app.dto;

public class PlayerOrderDTO {

    protected long id;
    protected PlayerDTO player;
    protected String phoneNumber;
    protected OrderDTO order;

    public PlayerOrderDTO() {

    }

    public PlayerOrderDTO(long id, PlayerDTO player, String phoneNumber, OrderDTO order) {
        this.id = id;
        this.player = player;
        this.phoneNumber = phoneNumber;
        this.order = order;
    }

    public PlayerOrderDTO(PlayerDTO player, String phoneNumber, OrderDTO order) {
        this.player = player;
        this.phoneNumber = phoneNumber;
        this.order = order;
    }

    public PlayerOrderDTO(long id, PlayerDTO player, String phoneNumber) {
        this.id = id;
        this.player = player;
        this.phoneNumber = phoneNumber;
    }

    public long getId() {
        return this.id;
    }

    public PlayerDTO getPlayer() {
        return this.player;
    }

    public void setPlayer(PlayerDTO player) {
        this.player = player;
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public OrderDTO getOrder() {
        return this.order;
    }

    public void setOrder(OrderDTO order) {
        this.order = order;
    }
}
