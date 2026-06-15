package com.ikerveiga.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ikerveiga.app.entity.OrderType;

@Repository
public interface OrderTypeRepository extends JpaRepository<OrderType, Long> {

    OrderType findById(long id);
}
