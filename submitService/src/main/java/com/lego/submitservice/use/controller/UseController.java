package com.lego.submitservice.use.controller;

import com.lego.submitservice.provide.entity.domain.State;
import com.lego.submitservice.provide.entity.dto.response.DenyResponse;
import com.lego.submitservice.use.entity.dto.request.CreateUseApplyRequest;
import com.lego.submitservice.use.entity.dto.response.UseApplyDetailResponse;
import com.lego.submitservice.use.entity.dto.response.UseApplyListResponse;
import com.lego.submitservice.use.service.UseApplyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/use")
@RequiredArgsConstructor
@Tag(name = "USE-APPLY", description = "사용 신청 관련")
public class UseController {

    private final UseApplyService useApplyService;

    // 사용 신청
    @PostMapping ("/register")
    @Operation(summary = "사용 신청 등록")
    public ResponseEntity<?> register(
            @RequestHeader("member-id") String employeeId,
            @RequestBody CreateUseApplyRequest createUseApplyRequest) {

        System.out.println("employeeId : " + employeeId);
        System.out.println("categoryId : " + createUseApplyRequest.getCategoryId());
        System.out.println("Content : " + createUseApplyRequest.getContent());
        System.out.println("TeamName : " + createUseApplyRequest.getTeamName());

        useApplyService.register(createUseApplyRequest, employeeId);
        return ResponseEntity.status(201).body(HttpStatus.CREATED);
    }

    // 사용 신청 내역
    @GetMapping("")
    @Operation(summary = "사용 신청 내역")
    public ResponseEntity<?> findAll(@RequestParam(required = false, name = "state") State state,
                                     Pageable pageable) {
        if (state == null) {
            return ResponseEntity.ok(useApplyService.findAll(pageable));
        } else {
            return ResponseEntity.ok(useApplyService.findAllByState(state, pageable));
        }
    }

    // 사용 신청 변경
    @PutMapping("/accept")
    @Operation(summary = "사용 신청 승인")
    public ResponseEntity<?> acceptState(@RequestHeader("member-id") String employeeId,
                                         @RequestParam(name = "useId") Long useId) {

        useApplyService.acceptState(useId, employeeId);
        return ResponseEntity.ok(HttpStatus.ACCEPTED);
    }

    @PutMapping("/deny")
    @Operation(summary = "사용 신청 거절")
    public ResponseEntity<?> denyState(@RequestHeader("member-id") String employeeId,
                                       @RequestBody DenyResponse denyResponse) {
        useApplyService.denyState(denyResponse, employeeId);
        return ResponseEntity.ok(HttpStatus.ACCEPTED);
    }

    // 팀당 사용 신청 내역
    @GetMapping("/team")
    @Operation(summary = "팀당 사용 신청 내역")
    public ResponseEntity<?> findAllByTeam(@RequestParam(name = "teamName") String teamName,
                                           @RequestParam(required = false, name = "state") State state,
                                           Pageable pageable) {
        if (state == null) {
            return ResponseEntity.ok(useApplyService.findAllByTeam(teamName, pageable));
        } else {
            return ResponseEntity.ok(useApplyService.findAllByTeamAndState(teamName, state, pageable));
        }
    }

    // 사용 신청 상세 조회
    @GetMapping("/{use-apply-id}")
    @Operation(summary = "사용 신청 상세 조회")
    public ResponseEntity<?> findByUseApplyId(@PathVariable("use-apply-id") Long useApplyId) {
        return ResponseEntity.ok(useApplyService.findByUseApplyId(useApplyId));
    }
}
