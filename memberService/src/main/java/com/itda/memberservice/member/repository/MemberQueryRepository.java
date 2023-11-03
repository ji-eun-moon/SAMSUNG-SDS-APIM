package com.itda.memberservice.member.repository;

import com.itda.memberservice.member.dto.response.EmployeeSearchResponse;
import com.itda.memberservice.member.dto.response.MemberResponse;
import com.itda.memberservice.member.dto.response.NameSearchResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface MemberQueryRepository {

    EmployeeSearchResponse findMemberByEmployeeId(String employeeId);

    List<NameSearchResponse> findByName(String name);

    Page<MemberResponse> findMemberResponse(Pageable pageable);

    MemberResponse findMemberResponseByEmployeeId(String employeeId);

}
