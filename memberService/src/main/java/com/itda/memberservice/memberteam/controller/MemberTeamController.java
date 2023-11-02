package com.itda.memberservice.memberTeam.controller;

import com.itda.memberservice.memberTeam.service.MemberTeamService;
import com.itda.memberservice.memberteam.dto.request.MemberTeamCheckRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/memberTeam")
@Tag(name = "MEMBERTEAM", description = "회원-팀 통합 관련 API")
@Slf4j
public class MemberTeamController {

    private final MemberTeamService memberTeamService;

    @GetMapping("/check")
    @Operation(summary = "회원-팀 체크", description = "해당 회원이 팀에 소속인지 여부 확인")
    public ResponseEntity<Boolean> check(@ModelAttribute MemberTeamCheckRequest request){

        log.info("팀 이름: {} 및 직원 ID: {}를 사용한 요청 수신", request.getTeamName(), request.getEmployeeId());

        return ResponseEntity.ok(memberTeamService.check(request));

    }

}
