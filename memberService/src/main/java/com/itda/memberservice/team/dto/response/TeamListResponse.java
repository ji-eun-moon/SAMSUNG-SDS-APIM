package com.itda.memberservice.team.dto.response;

import com.itda.memberservice.client.useCheck.dto.CategoryTokenResponse;
import com.itda.memberservice.member.dto.response.TeamMemberResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TeamListResponse {

     private Long teamId;
     private String teamName;
     private Integer teamCount;
     private List<TeamMemberResponse> teamMembers;
     private List<CategoryTokenResponse> tokenResponses;

}
