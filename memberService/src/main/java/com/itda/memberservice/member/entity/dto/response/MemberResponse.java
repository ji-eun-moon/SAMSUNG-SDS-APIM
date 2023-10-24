package com.itda.memberservice.member.entity.dto.response;

import com.itda.memberservice.member.entity.domain.Authority;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MemberResponse {

    private Long id;
    private String employeeId;
    private String name;
    private String phoneNumber;
    private String imageUrl;
    private Authority authority;
    private String department;
    private String position;
    private String email;
}
