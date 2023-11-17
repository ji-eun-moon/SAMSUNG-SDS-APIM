package com.lego.submitservice.client.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SearchMemberResponse {
    private String employeeId;
    private String name;
    private String department;
    private String position;
    private String imageUrl;
}
