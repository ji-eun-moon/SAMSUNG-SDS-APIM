package com.itda.memberservice.team.repository;

import com.itda.memberservice.member.dto.response.TeamMemberResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TeamQueryRepository {

    Page<TeamMemberResponse> findMembers(String teamName, Pageable pageable);

}
