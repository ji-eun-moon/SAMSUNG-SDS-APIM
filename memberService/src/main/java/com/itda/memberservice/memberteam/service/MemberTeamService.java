package com.itda.memberservice.memberteam.service;

import com.itda.memberservice.member.entity.Member;
import com.itda.memberservice.memberteam.dto.request.MemberTeamCheckRequest;
import com.itda.memberservice.memberteam.entity.MemberTeam;
import com.itda.memberservice.memberteam.repository.MemberTeamRepository;
import com.itda.memberservice.team.entity.Team;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class MemberTeamService {

    private final MemberTeamRepository memberTeamRepository;

    public void register(Member member, Team team){

        memberTeamRepository.save(MemberTeam.builder()
                .member(member)
                .team(team)
                .build());

    }

    @Transactional(readOnly = true)
    public Boolean check(MemberTeamCheckRequest request){

        return memberTeamRepository.check(request.getEmployeeId(), request.getTeamName());

    }

}
