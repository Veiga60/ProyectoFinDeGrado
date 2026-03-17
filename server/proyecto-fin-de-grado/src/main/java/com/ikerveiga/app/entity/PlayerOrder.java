package com.ikerveiga.app.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "player_orders")
@Inheritance(strategy = InheritanceType.JOINED)
public class PlayerOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wheel_order_id", nullable = false, unique = true)
    protected long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "player_id", referencedColumnName = "player_id")
    protected Player player;

    @Column(name = "player_phone_number")
    protected String phoneNumber;

    @ManyToOne
    @JoinColumn(name = "order_id", referencedColumnName = "order_id")
    protected Order order;

    public PlayerOrder() {

    }

    public PlayerOrder(long id, Player player, String phoneNumber, Order order) {
        this.id = id;
        this.player = player;
        this.phoneNumber = phoneNumber;
        this.order = order;
    }

    public PlayerOrder(Player player, String phoneNumber, Order order) {
        this.player = player;
        this.phoneNumber = phoneNumber;
        this.order = order;
    }

    public long getId() {
        return this.id;
    }

    public Player getPlayer() {
        return this.player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Order getOrder() {
        return this.order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

}
