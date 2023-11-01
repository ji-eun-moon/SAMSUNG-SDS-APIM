package com.itda.memberservice.team.controller;

import com.itda.memberservice.team.service.TeamService;
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
    public ResponseEntity<?> getTeamMembers(@PathVariable("teamName") String teamName) {

        return ResponseEntity.ok(teamService.findMembers(teamName));

    }

}
