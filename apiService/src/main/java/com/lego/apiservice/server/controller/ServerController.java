package com.lego.apiservice.server.controller;

import com.lego.apiservice.server.dto.request.CreateServerRequest;
import com.lego.apiservice.server.service.ServerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("")
@RequiredArgsConstructor
public class ServerController {

    private final ServerService serverService;

    @PostMapping("/register")
    public ResponseEntity<?> register(CreateServerRequest createServerRequest) {
        return ResponseEntity.status(201).body(HttpStatus.CREATED);
    }

    @GetMapping("/register")
    public ResponseEntity<?> test() {
        serverService.test("http://k9c201a.p.ssafy.io:8100");
        return ResponseEntity.status(200).body(HttpStatus.OK);
    }
}
