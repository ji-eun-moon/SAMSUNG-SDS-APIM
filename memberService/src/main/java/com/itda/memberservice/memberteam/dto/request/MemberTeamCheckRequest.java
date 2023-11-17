package com.itda.memberservice.memberteam.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemberTeamCheckRequest {

    private String teamName;
    private String employeeId;

}
