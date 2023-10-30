package com.itda.memberservice.member.dto.response;

import com.itda.memberservice.member.entity.Member;
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

    public SkipMemberResponse(Member member) {
        employeeId = member.getEmployeeId();
        name = member.getName();
        imageUrl = member.getImageUrl();
        email = member.getEmail();
        department = member.getDepartment();
        position = member.getPosition();
    }
}
