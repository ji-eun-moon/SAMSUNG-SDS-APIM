package com.itda.memberservice.member.service;

import com.itda.memberservice.member.dto.request.CreateMemberRequest;
import com.itda.memberservice.member.entity.Member;
import com.itda.memberservice.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder encoder;

    public Member register(CreateMemberRequest request){

        return memberRepository.save(Member.builder()
                        .employeeId(request.getEmployeeId())
                        .name(request.getName())
                        .password(encoder.encode(request.getPassword()))
                        .imageUrl(request.getImageUrl())
                        .authority(request.getAuthority())
                        .department(request.getDepartment())
                        .position(request.getPosition())
                        .email(request.getEmail())
                .build());

    }

    public boolean employeeIdDuplicateCheck(String employeeId){

        return memberRepository.existsMemberByEmployeeId(employeeId);

    }

}
