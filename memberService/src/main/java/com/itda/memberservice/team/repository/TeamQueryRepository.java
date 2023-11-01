package com.itda.memberservice.team.repository;

import com.itda.memberservice.member.dto.response.TeamMemberResponse;

import java.util.List;

public interface TeamQueryRepository {

    List<TeamMemberResponse> findMembers(Long teamId);

}
