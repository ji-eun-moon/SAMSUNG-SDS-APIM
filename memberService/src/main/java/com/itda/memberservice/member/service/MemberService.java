package com.itda.memberservice.member.service;

import com.itda.memberservice.member.dto.request.CreateMemberRequest;
import com.itda.memberservice.member.entity.Member;
import com.itda.memberservice.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public Member register(CreateMemberRequest request){

        return memberRepository.save(Member.builder()
                .build());

    }

    public boolean employeeIdDuplicateCheck(String employeeId){

        return memberRepository.existsMemberByEmployeeId(employeeId);

    }

}
