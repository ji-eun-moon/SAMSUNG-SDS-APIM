package com.itda.memberservice.team.controller;

import com.itda.memberservice.team.service.TeamService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/team")
@Slf4j
public class TeamController {

    private final TeamService teamService;

    @GetMapping("")
    @Operation(summary = "팀 회원 및 토큰 조회", description = "해당 팀 이름에 해당하는 회원들 목록과 사용중인 토큰 조회")
    public ResponseEntity<?> getTeamInformation(@RequestParam("teamName") String teamName) {

        log.info("{TeamController} : getTeamInformation \n" +
                "teamName = " + teamName);

        return ResponseEntity.ok(teamService.getTeamInformation(teamName));

    }

}
