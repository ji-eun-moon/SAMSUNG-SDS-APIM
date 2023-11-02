package com.lego.apiservice.useCheck.controller;

import com.lego.apiservice.global.config.AES128Config;
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
    private final AES128Config aes128Config;

    @PostMapping("/register")
    public ResponseEntity<HttpStatus> register(@RequestBody UseCheckRequest useCheckRequest) throws BusinessLogicException {
        useCheckService.register(useCheckRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(HttpStatus.CREATED);
    }

    @GetMapping("/encode")
    public ResponseEntity<?> encode(@RequestParam(name = "key") String key) throws BusinessLogicException {
        return ResponseEntity.ok(aes128Config.encrypt(key));
    }

    @GetMapping("/decode")
    public ResponseEntity<?> decode(@RequestParam(name = "key") String key) throws BusinessLogicException {
        return ResponseEntity.ok(aes128Config.decrypt(key));
    }

}
