package com.itda.memberservice.member.dto.response;

import com.itda.memberservice.member.entity.Authority;
import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(of = {
        "employeeId", "name", "imageUrl", "email", "department", "position", "authority"
})
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
