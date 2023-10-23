package com.lego.submitservice.test;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/submit")
public class TestController {

    @GetMapping("/welcome")
    public ResponseEntity<?> welcome() {
        return ResponseEntity.ok("welcome in submit");
    }

    @GetMapping("/message")
    public ResponseEntity<?> message(@RequestHeader("submit-request") String header) {
        System.out.println(header);
        return ResponseEntity.ok("hello sub-service");
    }

    @GetMapping("/check")
    public ResponseEntity<?> check() {
        return ResponseEntity.ok("hi this is submit-service");
    }
}

