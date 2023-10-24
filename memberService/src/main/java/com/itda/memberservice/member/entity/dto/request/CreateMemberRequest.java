package com.itda.memberservice.member.entity.dto.request;

import com.itda.memberservice.member.entity.domain.Authority;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateMemberRequest {

    private String employeeId;
    private String name;
    private String password;
    private String imageUrl;
    private Authority authority;
    private String department;
    private String position;

    private String email;

    private Long teamId;
    private String teamName;


}
