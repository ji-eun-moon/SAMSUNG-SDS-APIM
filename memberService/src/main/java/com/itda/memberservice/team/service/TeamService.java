package com.itda.memberservice.team.service;


import com.itda.memberservice.client.useCheck.UseCheckClient;
import com.itda.memberservice.client.useCheck.dto.CategoryTokenResponse;
import com.itda.memberservice.member.dto.response.TeamMemberResponse;
import com.itda.memberservice.team.dto.response.TeamListResponse;
import com.itda.memberservice.team.entity.Team;
import com.itda.memberservice.team.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
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

    public TeamListResponse getTeamInformation(String teamName, Pageable pageable){

        log.info("{TeamService-getTeamInformation} : teamName = " + teamName);



        Page<TeamMemberResponse> members = teamRepository.findMembers(teamName, pageable);

        Team team = teamRepository.findByName(teamName)
                .orElseThrow(() -> new NotFoundException("해당하는 팀은 존재하지 않습니다."));

        return TeamListResponse.builder()
                .teamMembers(members)
                .teamId(team.getTeamId())
                .teamName(team.getName())
                .build();

    }

    public List<CategoryTokenResponse> teamTokens(String teamName) {

        Map<String, String> map = new HashMap<>();
        map.put("teamName", teamName);

        return useCheckClient.getToken(map);

    }


}
