package com.itda.memberservice.member.repository;

import com.itda.memberservice.member.dto.response.EmployeeSearchResponse;
import com.itda.memberservice.member.dto.response.MemberResponse;
import com.itda.memberservice.member.dto.response.SearchMemberResponse;

import java.util.List;

public interface MemberQueryRepository {

    EmployeeSearchResponse findMemberByEmployeeId(String employeeId);

    List<SearchMemberResponse> findByName(String name);

    List<MemberResponse> findMemberResponse();

    MemberResponse findMemberResponseByEmployeeId(String employeeId);

}
