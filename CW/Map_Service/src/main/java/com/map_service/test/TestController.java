package com.map_service.test;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Tag(name = "Test", description = "간단한 테스트")
public class TestController {

    private final TestService testService;

    @GetMapping("")
    public ResponseEntity<?> test1() {
        return ResponseEntity.ok(testService.test1());
    }
}
