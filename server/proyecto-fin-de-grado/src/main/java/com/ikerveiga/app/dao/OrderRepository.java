package com.ikerveiga.app.dao;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ikerveiga.app.entity.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    Order findById(long id);

    @Query("SELECT a FROM Order a WHERE a.deadline > CURDATE() AND a.type.id = :typeId ORDER BY a.deadline")
    List<Order> findNextOrdersOfType(@Param("typeId") long typeId);

    @Query("SELECT a FROM Order a WHERE a.deadline = :deadline AND a.type.id = :typeId")
    Order findByDeadlineAndType(@Param("deadline") LocalDate deadline, @Param("typeId") long typeId);

}
