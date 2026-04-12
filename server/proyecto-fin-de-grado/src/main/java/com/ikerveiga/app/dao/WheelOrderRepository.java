package com.ikerveiga.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ikerveiga.app.entity.Order;
import com.ikerveiga.app.entity.WheelOrder;

@Repository
public interface WheelOrderRepository extends JpaRepository<WheelOrder, Long> {

    WheelOrder findById(long id);

    List<WheelOrder> findByOrder(Order order);

}
