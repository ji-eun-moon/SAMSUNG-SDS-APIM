package com.itda.memberservice.test;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/member")
@Slf4j
public class Controller {
    Environment env;

    @Autowired
    public Controller(Environment env) {
        this.env = env;
    }

    @GetMapping("/check")
    public ResponseEntity<?> portCheck() {
        return ResponseEntity.ok("This server PORT : " + env.getProperty("local.server.port"));
    }
}
