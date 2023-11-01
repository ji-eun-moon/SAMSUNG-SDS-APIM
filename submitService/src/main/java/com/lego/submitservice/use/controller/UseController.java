package com.lego.submitservice.use.controller;

import com.lego.submitservice.provide.entity.domain.State;
import com.lego.submitservice.provide.entity.dto.response.DenyResponse;
import com.lego.submitservice.use.entity.dto.request.CreateUseApplyRequest;
import com.lego.submitservice.use.entity.dto.response.UseApplyDetailResponse;
import com.lego.submitservice.use.entity.dto.response.UseApplyListResponse;
import com.lego.submitservice.use.service.UseApplyService;
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
public class UseController {

    private final UseApplyService useApplyService;

    // 사용 신청
    @PostMapping ("/register")
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
    public ResponseEntity<?> findAll(Pageable pageable) {
        return ResponseEntity.ok(useApplyService.findAll(pageable));
    }

    // 사용 신청 변경
    @PutMapping("/accept")
    public ResponseEntity<?> acceptState(@RequestHeader("member-id") String employeeId,
                                         @RequestParam(name = "useId") Long useId) {

        useApplyService.acceptState(useId, employeeId);
        return ResponseEntity.ok(HttpStatus.ACCEPTED);
    }

    @PutMapping("/deny")
    public ResponseEntity<?> denyState(@RequestHeader("member-id") String employeeId,
                                       @RequestBody DenyResponse denyResponse) {
        useApplyService.denyState(denyResponse, employeeId);
        return ResponseEntity.ok(HttpStatus.ACCEPTED);
    }

    // 팀당 사용 신청 내역
    @GetMapping("/team")
    public ResponseEntity<?> findAllByTeam(@RequestParam(name = "teamName") String teamName, Pageable pageable) {
        return ResponseEntity.ok(useApplyService.findAllByTeam(teamName, pageable));
    }

    // 사용 신청 상세 조회
    @GetMapping("/{use-apply-id}")
    public ResponseEntity<?> findByUseApplyId(@PathVariable("use-apply-id") Long useApplyId) {
        return ResponseEntity.ok(useApplyService.findByUseApplyId(useApplyId));
    }
}
