package com.lego.apiservice.api.controller;

import com.lego.apiservice.api.entity.domain.ApiStatus;
import com.lego.apiservice.api.entity.dto.response.*;
import com.lego.apiservice.api.service.ApiService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.tags.Tags;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/apis")
@RequiredArgsConstructor
@Tag(name = "API", description = "API 정보 관련")
public class ApiController {

    private final ApiService apiService;

    @GetMapping("/detail")
    @Operation(summary = "api 상세 조회")
    public ResponseEntity<?> apiDetail(@RequestParam(name = "apiId") Long apiId) {
        return ResponseEntity.ok(apiService.apiDetail(apiId));
    }

    @GetMapping("/available")
    @Operation(summary = "api 사용 신청 가능 여부 조회")
    public ResponseEntity<?> apiAvailable(@RequestParam(name = "apiId") Long apiId,
                                          @RequestParam(name = "teamName") String teamName) {
        return ResponseEntity.ok(apiService.apiAvailable(apiId, teamName));
    }

    @GetMapping("/test")
    @Operation(summary = "api 테스트 조회")
    public ResponseEntity<?> apiTest(@RequestParam(name = "apiId") Long apiId) {
        return ResponseEntity.ok(apiService.apiTest(apiId));
    }

    @GetMapping("/search")
    @Operation(summary = "api 검색")
    public ResponseEntity<?> apiSearch(@RequestParam(name = "apiName", required = false) String apiName) {
        if (apiName == null) {
            return ResponseEntity.ok(apiService.apiAll());
        } else {
            return ResponseEntity.ok(apiService.apiSearch(apiName));
        }
    }

    @GetMapping("/status")
    @Operation(summary = "api 상태 조회 - 이름, 상태, 페이지 네이션")
    public ResponseEntity<?> apiStatus(@RequestParam(name = "status", required = false) ApiStatus status,
                                       Pageable pageable) {
        if (status == null) {
            return ResponseEntity.ok(apiService.apiStatusAll(pageable));
        } else {
            return ResponseEntity.ok(apiService.apiStatusByStatus(status, pageable));
        }
    }
}
