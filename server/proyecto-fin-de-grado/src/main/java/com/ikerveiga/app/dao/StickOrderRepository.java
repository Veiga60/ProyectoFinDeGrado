package com.ikerveiga.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ikerveiga.app.entity.Order;
import com.ikerveiga.app.entity.StickOrder;

@Repository
public interface StickOrderRepository extends JpaRepository<StickOrder, Long> {

    StickOrder findById(long id);

    List<StickOrder> findByOrder(Order order);

}
