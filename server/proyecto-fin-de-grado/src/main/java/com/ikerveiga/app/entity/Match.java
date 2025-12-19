package com.ikerveiga.app.entity;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Matches")
public class Match {

    @Id
    @Column(name = "match_id", nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(optional = false, cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private long localTeamId;

    @ManyToOne(optional = false, cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private long visitingTeamId;

    @Column(name = "match_date", nullable = true, unique = false)
    private LocalDate date;

    @Column(name = "match_time", nullable = true, unique = false)
    private LocalTime time;

    @Column(name = "match_played", nullable = false, unique = false)
    private boolean isPlayed;

}
