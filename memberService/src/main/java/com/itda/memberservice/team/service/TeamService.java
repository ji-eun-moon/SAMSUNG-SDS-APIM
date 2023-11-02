package com.itda.memberservice.team.service;


import com.itda.memberservice.member.dto.response.TeamMemberResponse;
import com.itda.memberservice.team.entity.Team;
import com.itda.memberservice.team.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class TeamService {

    private final TeamRepository teamRepository;

    public Team registerTeamOrFind(String teamName){

        Optional<Team> findTeam = teamRepository.findByName(teamName);

        return findTeam.orElseGet(() -> teamRepository.save(Team.builder()
                                                            .name(teamName)
                                                            .build()));

    }

    public List<TeamMemberResponse> findMembers(String teamName){

        log.info("{TeamService-findMembers} : teamName = " + teamName);

        return teamRepository.findMembers(teamName);

    }


}