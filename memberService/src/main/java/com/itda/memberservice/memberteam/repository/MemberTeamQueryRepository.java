package com.itda.memberservice.memberteam.repository;

import com.itda.memberservice.member.entity.Member;

import java.util.List;

public interface MemberTeamQueryRepository {

    Boolean check(String employeeId, String teamName);

    List<Member> findMembersByTeam(String teamName);

    List<String> findEmployeeIdByTeamName(String teamName);
}
