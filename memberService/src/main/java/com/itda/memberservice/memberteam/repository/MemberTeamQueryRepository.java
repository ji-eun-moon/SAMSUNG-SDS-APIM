package com.itda.memberservice.memberteam.repository;

public interface MemberTeamQueryRepository {

    Boolean check(String employeeId, String teamName);

}
