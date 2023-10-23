package com.itda.memberservice.member.entity.domain;

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
    private String employeeId;
    private String name;
    private String password;
    private String imageUrl;

    @Embedded
    private Authority authority;

    private String department;
    private String position;
    private String email;


}
