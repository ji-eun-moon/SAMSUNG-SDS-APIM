package com.itda.memberservice.member.service;

import com.itda.memberservice.member.dto.request.CreateMemberRequest;
import com.itda.memberservice.member.dto.response.MemberResponse;
import com.itda.memberservice.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;

    @Override
    public MemberResponse createMember(CreateMemberRequest createMemberRequest) {

        return new MemberResponse();
    }
}
