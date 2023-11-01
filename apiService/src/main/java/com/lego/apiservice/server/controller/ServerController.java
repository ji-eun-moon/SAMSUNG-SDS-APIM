package com.lego.apiservice.server.controller;

import com.lego.apiservice.server.dto.request.CreateServerRequest;
import com.lego.apiservice.server.dto.request.ParameterInfo;
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

    @GetMapping ("/accept")
    public ResponseEntity<?> accept(@RequestParam(name = "endpoint") String endpoint) {
        List<ParameterInfo> parameterInfoList = new ArrayList<>();
        parameterInfoList.add(new ParameterInfo("page", "페이지", "1", "Integer"));
        parameterInfoList.add(new ParameterInfo("page", "페이지", "1", "Integer"));
        System.out.println(parameterInfoList.toString().replace("ParameterInfo", "").replace("(", "{").replace(")", "}").replace("=", ":"));
        return ResponseEntity.status(201).body(HttpStatus.CREATED);
    }
}
