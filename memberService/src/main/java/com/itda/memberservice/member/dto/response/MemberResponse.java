package com.itda.memberservice.member.dto.response;

import com.itda.memberservice.member.entity.Authority;
import com.itda.memberservice.team.dto.response.TeamResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MemberResponse {
    private Long memberId;
    private String employeeId;
    private String name;
    private String imageUrl;
    private Authority authority;
    private String department;
    private String position;
    private String email;
    private List<TeamResponse> teams;

    public void setTeams(List<TeamResponse> teams) {
        this.teams = teams;
    }
}
