package com.itda.memberservice.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NameSearchResponse {

    private String employeeId;
    private String name;
    private String department;
    private String position;
    private String imageUrl;

}
