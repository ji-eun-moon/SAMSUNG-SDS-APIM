package com.lego.apiservice.useCheck.controller;

import com.lego.apiservice.global.exception.BusinessLogicException;
import com.lego.apiservice.useCheck.entity.dto.request.UseCheckRequest;
import com.lego.apiservice.useCheck.service.UseCheckService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/use-check")
@RequiredArgsConstructor
public class UseCheckController {

    private final UseCheckService useCheckService;

    @PostMapping("/register")
    public ResponseEntity<HttpStatus> register(@RequestBody UseCheckRequest useCheckRequest) throws BusinessLogicException {
        useCheckService.register(useCheckRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(HttpStatus.CREATED);
    }
}
