package com.itda.memberservice.domain.dto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(length = 20)
    private String employeeId;

    @Column(length = 10)
    private String name;

    @Column(length = 72)
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(length = 20)
    private String department;

    @Column(length = 20)
    private String position;

    @Column(length = 30)
    private String email;

    @CreatedDate
    private LocalDateTime createdAt;

}
