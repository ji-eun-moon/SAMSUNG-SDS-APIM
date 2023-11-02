package com.lego.submitservice.provide.controller;

import com.lego.submitservice.client.member.MemberServiceClient;
import com.lego.submitservice.provide.entity.domain.ApplyType;
import com.lego.submitservice.provide.entity.domain.State;
import com.lego.submitservice.provide.entity.dto.request.AcceptRequest;
import com.lego.submitservice.provide.entity.dto.request.CreateProvideRequest;
import com.lego.submitservice.provide.entity.dto.response.DenyResponse;
import com.lego.submitservice.provide.entity.dto.response.ProvideDetailResponse;
import com.lego.submitservice.provide.entity.dto.response.ProvideListResponse;
import com.lego.submitservice.provide.service.ProvideService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/provide")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "PROVIDE", description = "제공 신청 관련")
public class ProvideController {

    private final ProvideService provideService;
    private final MemberServiceClient memberServiceClient;

    // 제공 신청
    @PostMapping ("/register")
    @Operation(summary = "제공 신청 등록")
    public ResponseEntity<?> register(
            @RequestHeader("member-id") String employeeId,
            @RequestBody CreateProvideRequest createProvideRequest) {
        provideService.register(employeeId, createProvideRequest);
        return ResponseEntity.status(201).body(HttpStatus.CREATED);
    }

    // 제공 신청 내역 조회
    @GetMapping("")
    @Operation(summary = "제공 신청 내역 조회", description = "상태를 통해 필터링 가능")
    public ResponseEntity<?> findAll(@RequestParam(required = false, name = "state") State state,
                                     Pageable pageable) {
        Page<ProvideListResponse> pages;
        if (state == null) {
            pages = provideService.findAll(pageable);
        } else {
            pages = provideService.findAllByState(pageable, state);
        }
        return ResponseEntity.ok(pages);
    }

    // 제공 신청 변경 - 승인
    @PutMapping("/accept")
    @Operation(summary = "제공 신청 승인")
    public ResponseEntity<?> acceptState(
            @RequestHeader("member-id") String employeeId,
            @RequestBody AcceptRequest acceptRequest) {

        provideService.acceptState(employeeId, acceptRequest);

        return ResponseEntity.ok(HttpStatus.ACCEPTED);
    }

    // 제공 신청 변경 - 거절
    @PutMapping("/deny")
    @Operation(summary = "제공 신청 거절")
    public ResponseEntity<?> denyState(
            @RequestHeader("member-id") String employeeId,
            @RequestBody DenyResponse denyResponse) {

        provideService.denyState(employeeId, denyResponse.getId(), denyResponse.getDenyReason());
        return ResponseEntity.ok(HttpStatus.ACCEPTED);
    }


    // 팀당 제공 신청 내역
    @GetMapping("/team")
    @Operation(summary = "팀당 제공 신청 내역")
    public ResponseEntity<?> findAllByTeam(@RequestParam(name = "teamName") String teamName,
                                           @RequestParam(required = false, name = "state") State state,
                                           Pageable pageable) {
        Page<ProvideListResponse> pages;
        if (state == null) {
            pages = provideService.findAllByTeam(pageable, teamName);
        } else {
            pages = provideService.findAllByTeamAndState(pageable, teamName, state);
        }
        return ResponseEntity.ok(pages);
    }

    // 제공 신청 상세 조회
    @GetMapping("/{provide-id}")
    @Operation(summary = "제공 신청 상세 조회")
    public ResponseEntity<?> findByProvideId(@PathVariable("provide-id") Long provideId) {
        return ResponseEntity.ok(provideService.findDetailByProvideId(provideId));
    }

    @DeleteMapping("")
    @Operation(summary = "제공 신청 전체 삭제", description = "백엔드 연습용")
    public ResponseEntity<?> deleteAll() {
        provideService.deleteAll();
        return ResponseEntity.status(204).body(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/ids-object")
    @Operation(summary = "제공 신청 전체 아이디 객체")
    public ResponseEntity<?> findAllIds() {
        return ResponseEntity.ok(provideService.findAllIds());
    }
    @GetMapping("/ids-array")
    @Operation(summary = "제공 신청 전체 아이디 배열")
    public ResponseEntity<?> findAllIdsToLong() {
        return ResponseEntity.ok(provideService.findAllIdsToLong());
    }
}
