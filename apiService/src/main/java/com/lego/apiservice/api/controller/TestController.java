package com.lego.apiservice.api.controller;

import com.lego.apiservice.api.service.ApiTestService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.tags.Tags;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/test")
@Tag(name = "TEST", description = "시연때 사용할 api")
public class TestController {

    private final ApiTestService apiTestService;

    @GetMapping("")
    @Operation(summary = "api 한번씩 사용하기")
    public ResponseEntity<?> useApi(@RequestParam(name = "teamName") String teamName) {
        apiTestService.apiTest(teamName);
        return ResponseEntity.ok("성공적");
    }
}
