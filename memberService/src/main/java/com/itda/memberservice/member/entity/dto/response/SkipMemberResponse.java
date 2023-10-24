package com.itda.memberservice.member.entity.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SkipMemberResponse {

    private String employeeId;
    private String name;
}
