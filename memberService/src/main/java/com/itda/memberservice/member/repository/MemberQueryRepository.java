package com.itda.memberservice.member.repository;

import com.itda.memberservice.member.entity.Member;

public interface MemberQueryRepository {

    void deleteByMemberId(Long memberId);

    Member findMemberByEmployeeId(String employeeId);

}
