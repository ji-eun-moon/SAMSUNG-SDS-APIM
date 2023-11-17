package com.itda.memberservice.team.service;


import com.itda.memberservice.client.usecheck.UseCheckClient;
import com.itda.memberservice.client.usecheck.dto.CategoryTokenResponse;
import com.itda.memberservice.error.CustomException;
import com.itda.memberservice.error.ErrorCode;
import com.itda.memberservice.member.dto.response.TeamMemberResponse;
import com.itda.memberservice.team.dto.response.TeamListResponse;
import com.itda.memberservice.team.entity.Team;
import com.itda.memberservice.team.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class TeamService {

    private final TeamRepository teamRepository;
    private final UseCheckClient useCheckClient;

    public Team registerTeamOrFind(String teamName){

        Optional<Team> findTeam = teamRepository.findByName(teamName);

        return findTeam.orElseGet(() -> teamRepository.save(Team.builder()
                                                            .name(teamName)
                                                            .build()));

    }

    @Transactional(readOnly = true)
    public TeamListResponse getTeamInformation(String teamName, Pageable pageable){

        log.info("{TeamService-getTeamInformation} : teamName = " + teamName);



        Page<TeamMemberResponse> members = teamRepository.findMembers(teamName, pageable);

        Team team = teamRepository.findByName(teamName)
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_NOT_FOUND));

        return TeamListResponse.builder()
                .teamMembers(members)
                .teamId(team.getTeamId())
                .teamName(team.getName())
                .build();

    }

    @Transactional(readOnly = true)
    public List<CategoryTokenResponse> teamTokens(String teamName) {

        Map<String, String> map = new HashMap<>();
        map.put("teamName", teamName);

        return useCheckClient.getToken(map);

    }


}
