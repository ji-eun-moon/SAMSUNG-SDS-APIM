package com.itda.memberservice.member.entity.domain;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Column(nullable = false, unique = true, length = 10)
    private String employeeId;

    @Column(nullable = false, length = 20)
    private String name;

    @Column(nullable = false, length = 72)
    private String password;

    @Column(length = 1000)
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    private Authority authority;

    @Column(length = 20)
    private String department;

    @Column(length = 20)
    private String position;

    @Column(length = 30)
    private String email;

    @CreatedDate
    private LocalDateTime createdAt;

}
