package com.lego.submitservice.provide.controller;

import com.lego.submitservice.provide.entity.domain.ApplyType;
import com.lego.submitservice.provide.entity.domain.State;
import com.lego.submitservice.provide.entity.dto.request.CreateProvideRequest;
import com.lego.submitservice.provide.entity.dto.response.ProvideDetailResponse;
import com.lego.submitservice.provide.entity.dto.response.ProvideListResponse;
import com.lego.submitservice.provide.service.ProvideService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/provide")
@RequiredArgsConstructor
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

    // 제공 신청 변경
    @PutMapping("")
    public ResponseEntity<?> changeState(@RequestParam(name = "provideId") Long provideId) {
        return ResponseEntity.ok(HttpStatus.ACCEPTED);
    }


    // 팀당 제공 신청 내역
    @GetMapping("/team")
    public ResponseEntity<?> findAllByTeam(@RequestParam(name = "teamId") Long teamId) {
        List<ProvideListResponse> provideListResponseList = new ArrayList<>();
        provideListResponseList.add(new ProvideListResponse(1L, "나의 서버", "나의 팀", "이찬웅", LocalDateTime.now(),
                State.대기, ApplyType.신청));
        provideListResponseList.add(new ProvideListResponse());

        return ResponseEntity.ok(provideListResponseList);
    }

    // 제공 신청 상세 조회
    @GetMapping("/{provide-id}")
    public ResponseEntity<?> findByProvideId(@PathVariable("provide-id") Long provideId) {
        return ResponseEntity.ok(new ProvideDetailResponse(1L, "나의 서버", "나의 서버에 대한 설명입니다",
                "나의 팀", "이찬웅", LocalDateTime.now(),
                State.거질, ApplyType.신청, "맘에 들지 않아요", "http://k9c201.p.ssafy.io:9100/swagger-ui/index.html"));
    }
}
