package com.itda.memberservice.memberTeam.repository;

public interface MemberTeamQueryRepository {

    Boolean check(String employeeId, String teamName);

}
