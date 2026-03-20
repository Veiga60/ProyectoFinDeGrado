package com.ikerveiga.app.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.ikerveiga.app.dto.OrderDTO;
import com.ikerveiga.app.dto.PlayerOrderDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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

    @ManyToOne
    @JoinColumn(name = "order_type_id", nullable = false, unique = false)
    private OrderType type;

    @OneToMany(mappedBy = "order")
    private List<PlayerOrder> playerOrders;

    public Order() {

    }

    public Order(long id, LocalDate deadline, OrderType type, List<PlayerOrder> playerOrders) {
        this.id = id;
        this.deadline = deadline;
        this.type = type;
        this.playerOrders = playerOrders;
    }

    public Order(LocalDate deadline, OrderType type, List<PlayerOrder> playerOrders) {
        this.deadline = deadline;
        this.type = type;
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

    public OrderType getType() {
        return this.type;
    }

    public void setType(OrderType type) {
        this.type = type;
    }

    public List<PlayerOrder> getPlayerOrders() {
        return this.playerOrders;
    }

    public void setPlayerOrders(List<PlayerOrder> playerOrders) {
        this.playerOrders = playerOrders;
    }

    public OrderDTO toDTO() {
        List<PlayerOrderDTO> playerOrdersDTO = new ArrayList<>();

        for (PlayerOrder playerOrder : this.playerOrders) {
            playerOrdersDTO.add(playerOrder.toDTO());
        }

        OrderDTO orderDTO = new OrderDTO(this.id, this.deadline, this.type.toDTO(), playerOrdersDTO);

        return orderDTO;
    }

}
