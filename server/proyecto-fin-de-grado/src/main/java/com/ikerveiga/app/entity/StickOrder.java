package com.ikerveiga.app.entity;

import com.ikerveiga.app.dto.StickOrderDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "stick_orders")
public class StickOrder extends PlayerOrder {

    @ManyToOne
    @JoinColumn(name = "stick_model_id", nullable = false, unique = false)
    private StickModel model;

    @ManyToOne
    @JoinColumn(name = "stick_length_id", nullable = false, unique = false)
    private StickLength length;

    @ManyToOne
    @JoinColumn(name = "stick_weight_id", nullable = false, unique = false)
    private StickWeight weight;

    @Column(name = "stick_side", nullable = false, unique = false)
    private String side;

    @ManyToOne
    @JoinColumn(name = "stick_blade_id", nullable = false, unique = false)
    private StickBlade blade;

    @ManyToOne
    @JoinColumn(name = "stick_flex_id", nullable = false, unique = false)
    private StickFlex flex;

    @ManyToOne
    @JoinColumn(name = "stick_kickpoint_id", nullable = false, unique = false)
    private StickKickpoint kickpoint;

    @ManyToOne
    @JoinColumn(name = "stick_grip_id", nullable = false, unique = false)
    private StickGrip grip;

    @Column(name = "stick_amount", nullable = false, unique = false)
    private int amount;

    @Column(name = "stick_nametag", nullable = false, unique = false)
    private String nametag;

    public StickOrder() {

    }

    public StickOrder(long id, Player player, String phoneNumber, Order order, StickModel model, StickLength length,
            StickWeight weight, String side, StickBlade blade,
            StickFlex flex, StickKickpoint kickpoint, StickGrip grip, int amount, String nametag) {
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

    public StickOrder(Player player, String phoneNumber, Order order, StickModel model, StickLength length,
            StickWeight weight, String side, StickBlade blade,
            StickFlex flex, StickKickpoint kickpoint, StickGrip grip, int amount, String nametag) {
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

    public StickModel getModel() {
        return this.model;
    }

    public void setModel(StickModel model) {
        this.model = model;
    }

    public StickLength getLength() {
        return this.length;
    }

    public void setLength(StickLength length) {
        this.length = length;
    }

    public StickWeight getWeight() {
        return this.weight;
    }

    public void setWeight(StickWeight weight) {
        this.weight = weight;
    }

    public String getSide() {
        return this.side;
    }

    public void setSide(String side) {
        this.side = side;
    }

    public StickBlade getBlade() {
        return this.blade;
    }

    public void setBlade(StickBlade blade) {
        this.blade = blade;
    }

    public StickFlex getFlex() {
        return this.flex;
    }

    public void setFlex(StickFlex flex) {
        this.flex = flex;
    }

    public StickKickpoint getKickpoint() {
        return this.kickpoint;
    }

    public void setKickpoint(StickKickpoint kickpoint) {
        this.kickpoint = kickpoint;
    }

    public StickGrip getGrip() {
        return this.grip;
    }

    public void setGrip(StickGrip grip) {
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

    public StickOrderDTO toDTO() {
        StickOrderDTO stickOrderDTO = new StickOrderDTO(this.id, this.player.toDTOWithoutStatsAndCalls(),
                this.phoneNumber, this.order.toDTO(), this.model.toDTO(), this.length.toDTO(), this.weight.toDTO(),
                this.side, this.blade.toDTO(), this.flex.toDTO(), this.kickpoint.toDTO(), this.grip.toDTO(),
                this.amount, this.nametag);

        return stickOrderDTO;
    }
}
