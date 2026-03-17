package com.ikerveiga.app.dto;

import java.time.LocalDate;
import java.util.List;

import com.ikerveiga.app.entity.PlayerOrder;

public class OrderDTO {

    private long id;
    private LocalDate deadline;
    private List<PlayerOrder> playerOrders;

    public OrderDTO() {

    }

    public OrderDTO(long id, LocalDate deadline, List<PlayerOrder> playerOrders) {
        this.id = id;
        this.deadline = deadline;
        this.playerOrders = playerOrders;
    }

    public OrderDTO(LocalDate deadline, List<PlayerOrder> playerOrders) {
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
}
