package com.itda.memberservice.member.dto.request;

import com.itda.memberservice.member.entity.Authority;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

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

    private List<CreateMemberRequest> team = new ArrayList<>();

}
