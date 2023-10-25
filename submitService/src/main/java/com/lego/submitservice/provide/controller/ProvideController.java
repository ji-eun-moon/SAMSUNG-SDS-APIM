package com.lego.submitservice.provide.controller;

import com.lego.submitservice.provide.entity.domain.ApplyType;
import com.lego.submitservice.provide.entity.domain.State;
import com.lego.submitservice.provide.entity.dto.request.CreateProvideRequest;
import com.lego.submitservice.provide.entity.dto.response.ProvideListResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/provide")
public class ProvideController {

    // 제공 신청
    @GetMapping("/register")
    public ResponseEntity<?> register(@RequestBody CreateProvideRequest createProvideRequest) {
        return ResponseEntity.status(201).body(HttpStatus.CREATED);
    }

    // 제공 신청 내역 조회
    @GetMapping("")
    public ResponseEntity<?> findAll() {
        List<ProvideListResponse> provideListResponseList = new ArrayList<>();
        provideListResponseList.add(new ProvideListResponse(1L, "나의 서버", "나의 팀", "이찬웅", LocalDateTime.now(),
                State.대기, ApplyType.신청));
        provideListResponseList.add(new ProvideListResponse());

        return ResponseEntity.ok(provideListResponseList);
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
}
