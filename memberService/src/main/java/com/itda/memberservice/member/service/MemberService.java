package com.itda.memberservice.member.service;

import com.itda.memberservice.member.dto.request.CreateMemberRequest;
import com.itda.memberservice.member.dto.response.MemberResponse;

public interface MemberService {
    MemberResponse createMember(CreateMemberRequest createMemberRequest);
}
