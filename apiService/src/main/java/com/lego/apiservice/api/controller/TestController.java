package com.lego.apiservice.api.controller;

import com.lego.apiservice.api.service.ApiTestService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.tags.Tags;
import lombok.RequiredArgsConstructor;
import org.json.simple.parser.ParseException;
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
    public ResponseEntity<?> useApi() {
        apiTestService.apiTest();
        return ResponseEntity.ok("성공적");
    }

    @GetMapping("warning")
    @Operation(summary = "401에러 보내기")
    public ResponseEntity<?> warnApi() {
        apiTestService.warningTest();
        return ResponseEntity.ok("성공적");
    }

    @GetMapping("error")
    @Operation(summary = "api 오류 생기게 만들기")
    public ResponseEntity<?> errorApi() throws ParseException {
        apiTestService.errorMessage();
        return ResponseEntity.ok("성공적");
    }
}
