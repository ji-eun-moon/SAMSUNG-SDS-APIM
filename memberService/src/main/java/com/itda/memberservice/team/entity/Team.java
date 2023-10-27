package com.itda.memberservice.team.entity;

import com.itda.memberservice.memberteam.entity.MemberTeam;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class Team {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long teamId;

    @Column(unique = true, length = 20)
    private String name;

    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL)
    private final List<MemberTeam> memberTeamList = new ArrayList<>();

}
