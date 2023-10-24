package com.itda.memberservice.member.entity.domain;

import com.itda.memberservice.team.entity.domain.Team;
import jakarta.persistence.*;
import lombok.*;

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
    @Column(nullable = false, unique = true)
    private String employeeId;
    private String name;
    private String password;
    private String phoneNumber;
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    private Authority authority;

    private String department;
    private String position;
    private String email;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;


}
