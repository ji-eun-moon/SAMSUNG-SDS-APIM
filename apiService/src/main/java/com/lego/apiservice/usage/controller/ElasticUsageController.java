package com.lego.apiservice.usage.controller;

import com.lego.apiservice.usage.entity.dto.request.CreateUsageRequest;
import com.lego.apiservice.usage.repository.ElasticUsageRepository;
import com.lego.apiservice.usage.service.ElasticUsageService;
import com.lego.apiservice.usage.service.UsageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/usage")
@RequiredArgsConstructor
@Tag(name = "USAGE", description = "통계 관련")
public class ElasticUsageController {

    private final ElasticUsageService usageService;
    private final ElasticUsageRepository elasticUsageRepository;

    @PostMapping ("/register")
    public ResponseEntity<?> register(@RequestBody CreateUsageRequest createUsageRequest) {
        usageService.register(createUsageRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(HttpStatus.CREATED);
    }

    @GetMapping("")
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(usageService.findAll());
    }

    @GetMapping("/test")
    public ResponseEntity<?> findTest() {
        return ResponseEntity.ok(elasticUsageRepository.findAllByEndpointAndCreatedAtGreaterThanEqualAndCreatedAtLessThan(
                "/movie/all", LocalDateTime.now().minusDays(1), LocalDateTime.now()
        ));
    }

    @DeleteMapping("")
    public ResponseEntity<?> deleteAll() {
        usageService.deleteAll();
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/monthly")
    @Operation(summary = "월별 조회 - 최근 6개월")
    public ResponseEntity<?> getMonthly(@RequestParam(name = "apiId") Long apiId,
                                        @RequestParam(name = "teamName", required = false) String teamName) {
        if (teamName == null) {
            return ResponseEntity.ok(usageService.getMonthly(apiId));
        } else {
            return ResponseEntity.ok(usageService.getMonthly(teamName, apiId));
        }
    }

    @GetMapping("/daily")
    @Operation(summary = "일별 조회 - 최근 31일")
    public ResponseEntity<?> getDaily(@RequestParam(name = "apiId") Long apiId,
                                      @RequestParam(name = "teamName", required = false) String teamName) {
        if (teamName == null) {
            return ResponseEntity.ok(usageService.getDaily(apiId));
        } else {
            return ResponseEntity.ok(usageService.getDaily(teamName, apiId));
        }
    }

    @GetMapping("/hourly")
    @Operation(summary = "시간별 조회 - 최근 24시간")
    public ResponseEntity<?> getHourly(@RequestParam(name = "apiId") Long apiId,
                                       @RequestParam(name = "teamName", required = false) String teamName) {
        if (teamName == null) {
            return ResponseEntity.ok(usageService.getHourly(apiId));
        } else {
            return ResponseEntity.ok(usageService.getHourly(teamName, apiId));
        }
    }

    @GetMapping("/responseTime")
    @Operation(summary = "응답시간 - 최근 24시간")
    public ResponseEntity<?> getResponseTime(@RequestParam(name = "apiId") Long apiId,
                                       @RequestParam(name = "teamName", required = false) String teamName) {
        if (teamName == null) {
            return ResponseEntity.ok(usageService.getResponseTime(apiId));
        } else {
            return ResponseEntity.ok(usageService.getResponseTime(teamName, apiId));
        }
    }

    @GetMapping("/responseCode")
    @Operation(summary = "응답코드 - 최근 24시간")
    public ResponseEntity<?> getResponseCode(@RequestParam(name = "apiId") Long apiId,
                                             @RequestParam(name = "teamName", required = false) String teamName) {
        if (teamName == null) {
            return ResponseEntity.ok(usageService.getResponseCode(apiId));
        } else {
            return ResponseEntity.ok(usageService.getResponseCode(teamName, apiId));
        }
    }

    @PostMapping("/data")
    public ResponseEntity<?> data() {
        usageService.registerData();
        return ResponseEntity.status(HttpStatus.CREATED).body(HttpStatus.CREATED);
    }
}
