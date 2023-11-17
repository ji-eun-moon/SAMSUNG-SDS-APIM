package com.lego.apiservice.usage.controller;

import com.lego.apiservice.usage.entity.dto.request.CreateUsageRequest;
import com.lego.apiservice.usage.service.UsageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/mongo-usage")
@RequiredArgsConstructor
public class UsageController {

    private final UsageService usageService;

    @PostMapping ("/register")
    public ResponseEntity<?> register(@RequestBody CreateUsageRequest createUsageRequest) {
        usageService.register(createUsageRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(HttpStatus.CREATED);
    }

    @GetMapping("")
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(usageService.findAll());
    }

    @DeleteMapping("")
    public ResponseEntity<?> deleteAll() {
        usageService.deleteAll();
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/time")
    public ResponseEntity<LocalDateTime> time() {

        return ResponseEntity.ok(LocalDateTime.parse("2023-11-07T11:31:50.925216600"));
    }
}
