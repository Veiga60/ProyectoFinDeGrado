package com.ikerveiga.app.entity;

import com.ikerveiga.app.dto.WheelOrderDTO;
import com.ikerveiga.app.enums.WheelHardness;
import com.ikerveiga.app.enums.WheelModel;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;

@Entity
@Table(name = "wheel_orders")
public class WheelOrder extends PlayerOrder {

    @Enumerated(EnumType.STRING)
    @Column(name = "wheel_model", nullable = false, unique = false)
    private WheelModel model;

    @Enumerated(EnumType.STRING)
    @Column(name = "wheel_hardness", nullable = false, unique = false)
    private WheelHardness hardness;

    @Column(name = "wheel_size", nullable = false, unique = false)
    private String size;

    @Column(name = "wheel_amount", nullable = false, unique = false)
    private int amount;

    public WheelOrder() {

    }

    public WheelOrder(long id, Player player, String phoneNumber, Order order, WheelModel model, WheelHardness hardness,
            String size,
            int amount) {
        super(id, player, phoneNumber, order);
        this.model = model;
        this.hardness = hardness;
        this.size = size;
        this.amount = amount;
    }

    public WheelOrder(Player player, String phoneNumber, Order order, WheelModel model, WheelHardness hardness,
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

    public WheelOrderDTO toDTO() {
        WheelOrderDTO wheelOrderDTO = new WheelOrderDTO(this.id, this.player.toDTOWithoutStatsAndCalls(),
                this.phoneNumber, this.order.toDTO(), this.model, this.hardness,
                this.size, this.amount);

        return wheelOrderDTO;
    }

}
