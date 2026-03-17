package com.ikerveiga.app.entity;

import java.time.LocalDate;
import java.util.List;

import com.ikerveiga.app.dto.OrderDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id", nullable = false, unique = true)
    private long id;

    @Column(name = "order_deadline", nullable = false, unique = false)
    private LocalDate deadline;

    @OneToMany(mappedBy = "order")
    private List<PlayerOrder> playerOrders;

    public Order() {

    }

    public Order(long id, LocalDate deadline, List<PlayerOrder> playerOrders) {
        this.id = id;
        this.deadline = deadline;
        this.playerOrders = playerOrders;
    }

    public Order(LocalDate deadline, List<PlayerOrder> playerOrders) {
        this.deadline = deadline;
        this.playerOrders = playerOrders;
    }

    public long getId() {
        return this.id;
    }

    public LocalDate getDeadline() {
        return this.deadline;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }

    public List<PlayerOrder> getPlayerOrders() {
        return this.playerOrders;
    }

    public void setPlayerOrders(List<PlayerOrder> playerOrders) {
        this.playerOrders = playerOrders;
    }

    public OrderDTO toDTO() {
        OrderDTO orderDTO = new OrderDTO();

        return orderDTO;
    }

}
