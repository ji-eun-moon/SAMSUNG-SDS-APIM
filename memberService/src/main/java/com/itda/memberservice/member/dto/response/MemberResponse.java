package com.itda.memberservice.member.dto.response;

import com.itda.memberservice.member.entity.Authority;
import com.itda.memberservice.team.dto.response.TeamSkipResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MemberResponse {

    private String employeeId;
    private String name;
    private String imageUrl;
    private Authority authority;
    private String department;
    private String position;
    private String email;
    private List<TeamSkipResponse> teams;
}
