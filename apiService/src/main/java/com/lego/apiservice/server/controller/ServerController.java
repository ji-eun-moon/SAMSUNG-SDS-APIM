package com.lego.apiservice.server.controller;

import com.lego.apiservice.server.dto.request.CreateServerRequest;
import com.lego.apiservice.server.service.ServerService;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.SpecVersion;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springdoc.core.service.OpenAPIService;
import org.springdoc.webmvc.api.OpenApiActuatorResource;
import org.springdoc.webmvc.api.OpenApiResource;
import org.springdoc.webmvc.api.OpenApiWebMvcResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Locale;

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

    @GetMapping("/test")
    public ResponseEntity<?> test2(HttpServletRequest request) {

        OpenAPI openAPI = new OpenAPI(SpecVersion.V30);



        return ResponseEntity.status(200).body(openAPI);
    }
}
