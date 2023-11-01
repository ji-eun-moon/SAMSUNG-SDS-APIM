package com.lego.apiservice.api.controller;

import com.lego.apiservice.api.entity.domain.ApiStatus;
import com.lego.apiservice.api.entity.dto.response.*;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/apis")
public class ApiController {

    // 전체 api 리스트 조회 categoryId을 통해 조회
    @GetMapping("/all")
    public ResponseEntity<?> findApiByCategory(@RequestParam(name = "categoryId") Long categoryId) {
        List<CategoryApiResponse> categoryApiResponseList = new ArrayList<>();
        categoryApiResponseList.add(new CategoryApiResponse("밤톨이 건강상테 조회하기", "https://k9c201.p.ssafy.io/api/bamtol/health-check",
                1L));
        categoryApiResponseList.add(new CategoryApiResponse("밤톨이 건강상테 조회하기", "https://k9c201.p.ssafy.io/api/bamtol/health-check",
                1L));
        categoryApiResponseList.add(new CategoryApiResponse("밤톨이 건강상테 조회하기", "https://k9c201.p.ssafy.io/api/bamtol/health-check",
                1L));

        return ResponseEntity.ok(categoryApiResponseList);
    }

    // 사용중 api 리스트 조회
    @GetMapping("/use")
    public ResponseEntity<?> useApi(@RequestParam(name = "teamId") Long teamId,
                                    @RequestParam(name = "categoryId") Long categoryId) {
        List<CategoryApiResponse> categoryApiResponseList = new ArrayList<>();
        categoryApiResponseList.add(new CategoryApiResponse("맛집 조회하기", "https://k9c201.p.ssafy.io/api/bamtol/health-check",
                1L));
        categoryApiResponseList.add(new CategoryApiResponse("병원 조회하기", "https://k9c201.p.ssafy.io/api/bamtol/health-check",
                1L));
        categoryApiResponseList.add(new CategoryApiResponse("약국 조회하기", "https://k9c201.p.ssafy.io/api/bamtol/health-check",
                1L));

        return ResponseEntity.ok(categoryApiResponseList);
    }

    // 제공중 api 리스트 조회
    @GetMapping("/provide")
    public ResponseEntity<?> provideApi(@RequestParam(name = "teamId") Long teamId,
                                    @RequestParam(name = "categoryId") Long categoryId) {
        List<CategoryApiResponse> categoryApiResponseList = new ArrayList<>();
        categoryApiResponseList.add(new CategoryApiResponse("맛집 조회하기", "https://k9c201.p.ssafy.io/api/bamtol/health-check",
                1L));
        categoryApiResponseList.add(new CategoryApiResponse("병원 조회하기", "https://k9c201.p.ssafy.io/api/bamtol/health-check",
                1L));
        categoryApiResponseList.add(new CategoryApiResponse("약국 조회하기", "https://k9c201.p.ssafy.io/api/bamtol/health-check",
                1L));

        return ResponseEntity.ok(categoryApiResponseList);
    }

    // api 상세 조회
    @GetMapping("/detail")
    public ResponseEntity<?> apiDetail(@RequestParam(name = "apiId") Long apiId) {
        return ResponseEntity.ok(new ApiDetailResponse());
    }

    // api 테스트 조회
    @GetMapping("/test")
    public ResponseEntity<?> apiTest(@RequestParam(name = "apiId") Long apiId) {
        return ResponseEntity.ok(new ApiTestResponse());
    }

    // api 검색
    @GetMapping("/search")
    public ResponseEntity<?> apiSearch(@RequestParam(name = "apiName") String apiName) {
        List<ApiSearchResponse> apiSearchResponses = new ArrayList<>();
        apiSearchResponses.add(new ApiSearchResponse("밤톨이 건강상테 조회하기", "https://k9c201.p.ssafy.io/api/bamtol/health-check",
                1L, "다음 검색하기", 2L));
        apiSearchResponses.add(new ApiSearchResponse("밤톨이 건강상테 조회하기", "https://k9c201.p.ssafy.io/api/bamtol/health-check",
                1L, "다음 검색하기", 2L));
        apiSearchResponses.add(new ApiSearchResponse("밤톨이 건강상테 조회하기", "https://k9c201.p.ssafy.io/api/bamtol/health-check",
                1L, "다음 검색하기", 2L));

        return ResponseEntity.ok(apiSearchResponses);
    }

    // api 상태 조회 - 필터 api이름, 상태, 페이지 네이션, 전체 페이지
    @GetMapping("/status")
    public ResponseEntity<?> apiStatus(@RequestParam(name = "apiName", required = false) String apiName) {
        List<ApiStatusResponse> apiStatusResponses = new ArrayList<>();
        apiStatusResponses.add(new ApiStatusResponse("점심메뉴조히", "https:/~~", 1L, "나의 카테고리", 1L,
                ApiStatus.정상, LocalDateTime.now(), 0.123456));
        apiStatusResponses.add(new ApiStatusResponse("점심메뉴조히", "https:/~~", 1L, "나의 카테고리", 1L,
                ApiStatus.정상, LocalDateTime.now(), 0.123456));
        apiStatusResponses.add(new ApiStatusResponse("점심메뉴조히", "https:/~~", 1L, "나의 카테고리", 1L,
                ApiStatus.정상, LocalDateTime.now(), 0.123456));

        ApiStatusListResponse apiStatusListResponse = new ApiStatusListResponse(apiStatusResponses, 1, 2);
        return ResponseEntity.ok(apiStatusListResponse);
    }
}