package com.lego.submitservice.client.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SkipMemberResponse {

    private String employeeId;
    private String name;
    private String imageUrl;
    private String email;
    private String department;
    private String position;

}
