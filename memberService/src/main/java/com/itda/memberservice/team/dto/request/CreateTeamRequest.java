package com.itda.memberservice.team.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateTeamRequest {
    private Long teamId;
    private String teamName;
}
