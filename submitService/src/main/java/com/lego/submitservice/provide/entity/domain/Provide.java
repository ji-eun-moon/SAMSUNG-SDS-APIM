package com.lego.submitservice.provide.entity.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Provide {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "provide_id")
    private Long id;

    private String serverName;
    private String description;
    private String endpoint;

    private String employeeId;
    private String teamName;

    private LocalDateTime createdAt;

    @Column(nullable = true)
    private LocalDateTime modifiedAt;

    @Enumerated(EnumType.STRING)
    private State state;

    @Enumerated(EnumType.STRING)
    private ApplyType applyType;

    @Column(nullable = true)
    private String denyReason;


    public void changeState(State state) {
        this.state = state;
    }

    public void setDenyReason(String s) {
        this.denyReason = s;
    }
}
