package com.ikerveiga.app.entity;

import com.ikerveiga.app.dto.OrderTypeDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "order_types")
public class OrderType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_type_id", nullable = false, unique = true)
    private long id;

    @Column(name = "order_type_description", nullable = false, unique = true)
    private String description;

    public OrderType() {

    }

    public OrderType(long id, String description) {
        this.id = id;
        this.description = description;
    }

    public OrderType(String description) {
        this.description = description;
    }

    public long getId() {
        return this.id;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public OrderTypeDTO toDTO() {
        OrderTypeDTO orderTypeDTO = new OrderTypeDTO(this.id, this.description);

        return orderTypeDTO;
    }
}
