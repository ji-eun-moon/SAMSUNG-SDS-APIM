package com.lego.submitservice.use.controller;

import com.lego.submitservice.use.entity.dto.request.CreateUseRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/use")
public class UseController {

    // 사용 신청
    @GetMapping("/register")
    public ResponseEntity<?> register(@RequestBody CreateUseRequest createUseRequest) {
        return ResponseEntity.status(201).body(HttpStatus.CREATED);
    }

    // 사용 신청 내역

    // 사용 신청 변경

    // 팀당 사용 신청 내역
}
