package com.lego.apiservice.test;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/server")
public class testController {

    @GetMapping("/welcome")
    public ResponseEntity<?> welcome() {
        return ResponseEntity.ok("welcome in api");
    }

    @GetMapping("/message")
    public ResponseEntity<?> message(@RequestHeader("api-request") String header) {
        System.out.println(header);
        return ResponseEntity.ok("hello api-service");
    }

    @GetMapping("/check")
    public ResponseEntity<?> check() {
        return ResponseEntity.ok("hi this is api-service");
    }
}
