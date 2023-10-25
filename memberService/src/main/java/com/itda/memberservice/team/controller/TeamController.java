package com.itda.memberservice.team.controller;

import com.itda.memberservice.member.dto.response.SkipMemberResponse;
import com.itda.memberservice.team.dto.response.TeamListResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/team")
public class TeamController {

    @GetMapping("/{team-id}")
    public ResponseEntity<?> getTeamMember(@PathVariable("team-id") Long teamId) {
        List<SkipMemberResponse> memberList = new ArrayList<>();
        memberList.add(new SkipMemberResponse("0912280", "문지은", "image", "cksdnd@naver.com",
                "광주 1반", "C201"));
        memberList.add(new SkipMemberResponse("0910286", "박서희", "image", "cksdnd@naver.com",
                "광주 1반", "C201"));

        List<TeamListResponse> teamInfoResponses = new ArrayList<>();
        teamInfoResponses.add(new TeamListResponse(1L, "ITDA 프로젝트-1", memberList.size(), memberList));
        teamInfoResponses.add(new TeamListResponse(2L, "ITDA 프로젝트-2", memberList.size(), memberList));
        return ResponseEntity.ok(teamInfoResponses);
    }

    //
}
