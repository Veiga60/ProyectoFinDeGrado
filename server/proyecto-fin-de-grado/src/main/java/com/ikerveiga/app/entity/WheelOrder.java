package com.ikerveiga.app.entity;

import com.ikerveiga.app.dto.PlayerOrderDTO;
import com.ikerveiga.app.dto.WheelOrderDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "wheel_orders")
public class WheelOrder extends PlayerOrder {

    @ManyToOne
    @JoinColumn(name = "wheel_model_id", nullable = false, unique = false)
    private WheelModel model;

    @ManyToOne
    @JoinColumn(name = "wheel_hardness_id", nullable = false, unique = false)
    private WheelHardness hardness;

    @ManyToOne
    @JoinColumn(name = "wheel_size_id", nullable = false, unique = false)
    private WheelSize size;

    @Column(name = "wheel_amount", nullable = false, unique = false)
    private int amount;

    public WheelOrder() {

    }

    public WheelOrder(long id, Player player, String phoneNumber, Order order, WheelModel model, WheelHardness hardness,
            WheelSize size,
            int amount) {
        super(id, player, phoneNumber, order);
        this.model = model;
        this.hardness = hardness;
        this.size = size;
        this.amount = amount;
    }

    public WheelOrder(Player player, String phoneNumber, Order order, WheelModel model, WheelHardness hardness,
            WheelSize size,
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

    public WheelSize getSize() {
        return this.size;
    }

    public void setSize(WheelSize size) {
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
                this.phoneNumber, this.order.toDTO(), this.model.toDTO(), this.hardness.toDTO(),
                this.size.toDTO(), this.amount);

        return wheelOrderDTO;
    }

    @Override
    public PlayerOrderDTO toDTOWithoutOrder() {
        WheelOrderDTO wheelOrderDTO = new WheelOrderDTO(this.id, this.player.toDTOWithoutStatsAndCalls(),
                this.phoneNumber, null, this.model.toDTO(), this.hardness.toDTO(),
                this.size.toDTO(), this.amount);

        return wheelOrderDTO;
    }

}
