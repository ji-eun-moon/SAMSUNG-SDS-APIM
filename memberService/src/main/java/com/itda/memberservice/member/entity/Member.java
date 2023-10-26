package com.itda.memberservice.member.entity;

import com.itda.memberservice.memberteam.entity.MemberTeam;
import com.itda.memberservice.notice.entity.Notice;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

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

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private final List<MemberTeam> memberTeamList = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private final List<Notice> noticeList = new ArrayList<>();

}
