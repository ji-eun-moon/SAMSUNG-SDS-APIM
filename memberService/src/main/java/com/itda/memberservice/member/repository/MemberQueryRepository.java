package com.itda.memberservice.member.repository;

import com.itda.memberservice.member.dto.response.MemberResponse;
import com.itda.memberservice.member.dto.response.SearchMemberResponse;
import com.itda.memberservice.member.entity.Member;

import java.util.List;

public interface MemberQueryRepository {

    void deleteByMemberId(Long memberId);

    Member findMemberByEmployeeId(String employeeId);

    List<SearchMemberResponse> findByName(String name);

    List<MemberResponse> findMemberResponse();
}
