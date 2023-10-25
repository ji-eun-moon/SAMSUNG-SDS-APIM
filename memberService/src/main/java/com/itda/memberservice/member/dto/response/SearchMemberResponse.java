package com.itda.memberservice.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SearchMemberResponse {

    private String employeeId;
    private String name;
    private String department;
    private String position;
    private String imageUrl;
}
