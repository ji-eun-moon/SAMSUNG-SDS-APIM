package com.itda.memberservice.member.repository;

import com.itda.memberservice.member.dto.response.EmployeeSearchResponse;
import com.itda.memberservice.member.dto.response.MemberResponse;
import com.itda.memberservice.member.dto.response.NameSearchResponse;

import java.util.List;

public interface MemberQueryRepository {

    EmployeeSearchResponse findMemberByEmployeeId(String employeeId);

    List<NameSearchResponse> findByName(String name);

    List<MemberResponse> findMemberResponse();

    MemberResponse findMemberResponseByEmployeeId(String employeeId);

}
