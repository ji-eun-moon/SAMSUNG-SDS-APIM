package com.itda.memberservice.member.service;

import com.itda.memberservice.member.entity.dto.request.CreateRequest;
import com.itda.memberservice.member.entity.dto.response.MemberResponse;

public interface MemberService {
    MemberResponse createMember(CreateRequest createRequest);
}
