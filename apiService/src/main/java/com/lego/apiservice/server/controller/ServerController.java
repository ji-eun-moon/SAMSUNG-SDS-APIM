package com.lego.apiservice.server.controller;

import com.lego.apiservice.server.dto.request.CreateServerRequest;
import com.lego.apiservice.server.dto.request.ParameterInfo;
import com.lego.apiservice.server.service.ServerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping("")
@RequiredArgsConstructor
public class ServerController {

    private final ServerService serverService;

    @PostMapping("/register")
    public ResponseEntity<HttpStatus> register(@RequestBody CreateServerRequest createServerRequest) {
        serverService.register(createServerRequest);
        return ResponseEntity.status(201).body(HttpStatus.CREATED);
    }

    @GetMapping("/test")
    public ResponseEntity<?> test(@RequestParam(name = "endpoint") String endpoint) {
        serverService.apiTest(serverService.apidocsConnect(endpoint));
        return ResponseEntity.status(200).body(HttpStatus.OK);
    }

}
