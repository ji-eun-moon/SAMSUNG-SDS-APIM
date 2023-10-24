package com.itda.memberservice.team.entity.dto.response;

import com.itda.memberservice.member.entity.dto.response.SkipMemberResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TeamInfoResponse {

     private Long id;
     private String name;
     private Integer count;
     private List<SkipMemberResponse> teamMembers;
}
