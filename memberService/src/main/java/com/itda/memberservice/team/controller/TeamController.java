package com.itda.memberservice.team.controller;

import com.itda.memberservice.team.service.TeamService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping("/team")
public class TeamController {

    private final TeamService teamService;

    @GetMapping("/{teamName}")
    @Operation(summary = "팀 회원 조회", description = "해당 팀 이름에 해당하는 회원들 목록 조회")
    public ResponseEntity<?> getTeamMembers(@PathVariable("teamName") String teamName) {

        return ResponseEntity.ok(teamService.findMembers(teamName));

    }

}
