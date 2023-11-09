package com.itda.memberservice.member.entity;

import com.itda.memberservice.memberteam.entity.MemberTeam;
import com.itda.memberservice.notice.entity.Notice;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
 import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@ToString(of = {"memberId", "employeeId", "name"})
@EntityListeners(AuditingEntityListener.class)
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

    @OneToMany(mappedBy = "member")
    private final List<MemberTeam> memberTeamList = new ArrayList<>();

    @OneToMany(mappedBy = "sender")
    private final List<Notice> sendList = new ArrayList<>();

    @OneToMany(mappedBy = "receiver")
    private final List<Notice> receiveList = new ArrayList<>();

    public void changePassword(String request){
        this.password = request;
    }

}
