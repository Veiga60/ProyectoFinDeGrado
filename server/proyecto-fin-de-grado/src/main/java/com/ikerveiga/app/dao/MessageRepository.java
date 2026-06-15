package com.ikerveiga.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ikerveiga.app.entity.Debate;
import com.ikerveiga.app.entity.Message;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    Message findById(long id);

    List<Message> findByDebate(Debate debate);
}
