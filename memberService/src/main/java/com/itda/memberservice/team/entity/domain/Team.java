package com.itda.memberservice.team.entity.domain;

import com.itda.memberservice.member.entity.domain.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Team {

    @Id
    @Column(name = "team_id")
    private Long id;
    private String name;

}
