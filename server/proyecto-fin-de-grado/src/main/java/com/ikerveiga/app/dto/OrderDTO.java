package com.ikerveiga.app.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

public class OrderDTO {

    private long id;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime deadline;
    private OrderTypeDTO type;
    private List<PlayerOrderDTO> playerOrders;
    private boolean isExcelDownloaded;

    public OrderDTO() {

    }

    public OrderDTO(long id, LocalDateTime deadline, OrderTypeDTO type, List<PlayerOrderDTO> playerOrders) {
        this.id = id;
        this.deadline = deadline;
        this.type = type;
        this.playerOrders = playerOrders;
        this.isExcelDownloaded = false;
    }

    public OrderDTO(LocalDateTime deadline, OrderTypeDTO type, List<PlayerOrderDTO> playerOrders) {
        this.deadline = deadline;
        this.type = type;
        this.playerOrders = playerOrders;
        this.isExcelDownloaded = false;
    }

    public long getId() {
        return this.id;
    }

    public LocalDateTime getDeadline() {
        return this.deadline;
    }

    public void setDeadline(LocalDateTime deadline) {
        this.deadline = deadline;
    }

    public OrderTypeDTO getType() {
        return this.type;
    }

    public void setType(OrderTypeDTO type) {
        this.type = type;
    }

    public List<PlayerOrderDTO> getPlayerOrders() {
        return this.playerOrders;
    }

    public void setPlayerOrders(List<PlayerOrderDTO> playerOrders) {
        this.playerOrders = playerOrders;
    }

    public boolean getIsExcelDownloaded() {
        return this.isExcelDownloaded;
    }

    public void setIsExcelDownloaded(boolean isExcelDownloaded) {
        this.isExcelDownloaded = isExcelDownloaded;
    }
}
