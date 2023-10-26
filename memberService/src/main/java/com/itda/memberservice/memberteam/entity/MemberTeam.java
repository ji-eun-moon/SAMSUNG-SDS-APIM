package com.itda.memberservice.memberteam.entity;

import com.itda.memberservice.member.entity.Member;
import com.itda.memberservice.team.entity.Team;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class MemberTeam {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberTeamId;

    private String teamName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

}
