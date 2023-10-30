package com.lego.submitservice.use.controller;

import com.lego.submitservice.provide.entity.domain.ApplyType;
import com.lego.submitservice.provide.entity.domain.State;
import com.lego.submitservice.provide.entity.dto.response.ProvideDetailResponse;
import com.lego.submitservice.provide.entity.dto.response.ProvideListResponse;
import com.lego.submitservice.use.entity.dto.request.CreateUseRequest;
import com.lego.submitservice.use.entity.dto.response.UseDetailResponse;
import com.lego.submitservice.use.entity.dto.response.UseListResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/use")
public class UseController {

    // 사용 신청
    @PostMapping ("/register")
    public ResponseEntity<?> register(@RequestBody CreateUseRequest createUseRequest) {
        return ResponseEntity.status(201).body(HttpStatus.CREATED);
    }

    // 사용 신청 내역
    @GetMapping("")
    public ResponseEntity<?> findAll() {
        List<UseListResponse> useListResponses = new ArrayList<>();
        useListResponses.add(new UseListResponse(1L, "나의 카테고리", "나의 팀", "이찬웅", LocalDateTime.now(),
                State.대기));
        useListResponses.add(new UseListResponse());

        return ResponseEntity.ok(useListResponses);
    }

    // 사용 신청 변경
    @PutMapping("")
    public ResponseEntity<?> changeState(@RequestParam(name = "useId") Long useId) {
        return ResponseEntity.ok(HttpStatus.ACCEPTED);
    }

    // 팀당 사용 신청 내역
    @GetMapping("/team")
    public ResponseEntity<?> findAllByTeam(@RequestParam(name = "teamId") Long teamId) {
        List<UseListResponse> useListResponses = new ArrayList<>();
        useListResponses.add(new UseListResponse(1L, "나의 카테고리", "나의 팀", "이찬웅", LocalDateTime.now(),
                State.대기));
        useListResponses.add(new UseListResponse());

        return ResponseEntity.ok(useListResponses);
    }

    // 사용 신청 상세 조회
    @GetMapping("/{use-id}")
    public ResponseEntity<?> findByProvideId(@PathVariable("use-id") Long useId) {
        return ResponseEntity.ok(new UseDetailResponse(1L, "나의 카테고리", "나의 카테고리에 대한 설명입니다",
                "나의 팀", "이찬웅", LocalDateTime.now(),
                State.거절, "맘에 들지 않아요"));
    }
}
