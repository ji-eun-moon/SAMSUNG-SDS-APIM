package com.lego.submitservice.provide.controller;

import com.lego.submitservice.provide.entity.domain.ApplyType;
import com.lego.submitservice.provide.entity.domain.State;
import com.lego.submitservice.provide.entity.dto.request.CreateProvideRequest;
import com.lego.submitservice.provide.entity.dto.response.DenyResponse;
import com.lego.submitservice.provide.entity.dto.response.ProvideDetailResponse;
import com.lego.submitservice.provide.entity.dto.response.ProvideListResponse;
import com.lego.submitservice.provide.service.ProvideService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/provide")
@RequiredArgsConstructor
@Slf4j
public class ProvideController {

    private final ProvideService provideService;

    // 제공 신청
    @PostMapping ("/register")
    public ResponseEntity<?> register(
            @RequestHeader("member-id") String employeeId,
            @RequestBody CreateProvideRequest createProvideRequest) {
        provideService.register(employeeId, createProvideRequest);
        return ResponseEntity.status(201).body(HttpStatus.CREATED);
    }

    // 제공 신청 내역 조회
    @GetMapping("")
    public ResponseEntity<?> findAll(Pageable pageable) {
        return ResponseEntity.ok(provideService.findAll(pageable));
    }

    // 제공 신청 변경 - 승인
    @PutMapping("/accept")
    public ResponseEntity<?> acceptState(
            @RequestHeader Map<String, String> headers,
            @RequestParam(name = "provideId") Long provideId) {
        String employeeId = headers.get("member-id");
        provideService.acceptState(employeeId, provideId);

        return ResponseEntity.ok(HttpStatus.ACCEPTED);
    }

    // 제공 신청 변경 - 승인
    @PutMapping("/deny")
    public ResponseEntity<?> denyState(
            @RequestHeader("member-id") String employeeId,
            @RequestBody DenyResponse denyResponse) {

        provideService.denyState(employeeId, denyResponse.getProvideId(), denyResponse.getDenyReason());
        return ResponseEntity.ok(HttpStatus.ACCEPTED);
    }


    // 팀당 제공 신청 내역
    @GetMapping("/team")
    public ResponseEntity<?> findAllByTeam(@RequestParam(name = "teamName") String teamName,
                                           Pageable pageable) {
        return ResponseEntity.ok(provideService.findAllByTeam(pageable, teamName));
    }

    // 제공 신청 상세 조회
    @GetMapping("/{provide-id}")
    public ResponseEntity<?> findByProvideId(@PathVariable("provide-id") Long provideId) {
        return ResponseEntity.ok(provideService.findDetailByProvideId(provideId));
    }

    @DeleteMapping("")
    public ResponseEntity<?> deleteAll() {
        provideService.deleteAll();
        return ResponseEntity.status(204).body(HttpStatus.NO_CONTENT);
    }
}
