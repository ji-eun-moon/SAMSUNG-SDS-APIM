package com.itda.memberservice.member.dto.response;

import com.itda.memberservice.member.entity.Authority;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeSearchResponse {

    private String employeeId;
    private String name;
    private String imageUrl;
    private String email;
    private String department;
    private String position;
    private Authority authority;
    private List<String> teamList;

    public void setTeamList(List<String> teamList) {
        this.teamList = teamList;
    }
}
