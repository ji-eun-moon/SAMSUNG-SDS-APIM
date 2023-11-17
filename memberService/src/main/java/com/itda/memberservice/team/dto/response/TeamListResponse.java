package com.itda.memberservice.team.dto.response;

import com.itda.memberservice.member.dto.response.TeamMemberResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TeamListResponse {

     private Long teamId;
     private String teamName;
     private Page<TeamMemberResponse> teamMembers;

}
