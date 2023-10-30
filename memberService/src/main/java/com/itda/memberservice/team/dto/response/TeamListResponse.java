package com.itda.memberservice.team.dto.response;

import com.itda.memberservice.member.dto.response.SkipMemberResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TeamListResponse {

     private Long teamId;
     private String teamName;
     private Integer teamCount;
     private List<SkipMemberResponse> teamMembers;
}