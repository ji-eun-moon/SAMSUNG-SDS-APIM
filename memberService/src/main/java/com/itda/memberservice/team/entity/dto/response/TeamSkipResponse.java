package com.itda.memberservice.team.entity.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TeamSkipResponse {

    private Long teamId;
    private String teamName;
}
