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

    public void register(List<CreateMemberRequest> requestList){

        for (CreateMemberRequest request : requestList) {

            if (memberRepository.existsMemberByEmployeeId(request.getEmployeeId())) {
                continue;
            }

            Member save = memberRepository.save(Member.builder()
                    .employeeId(request.getEmployeeId())
                    .authority(request.getAuthority())
                    .name(request.getName())
                    .email(request.getEmail())
                    .imageUrl(request.getImageUrl())
                    .department(request.getDepartment())
                    .position(request.getPosition())
                    .build());

            

        }

    }

}
