package com.lego.apiservice.useCheck.controller;

import com.lego.apiservice.global.config.AES128Config;
import com.lego.apiservice.global.exception.BusinessLogicException;
import com.lego.apiservice.useCheck.entity.dto.request.UseCheckRequest;
import com.lego.apiservice.useCheck.service.UseCheckService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/use-check")
@RequiredArgsConstructor
@Tag(name = "USE-CHECK", description = "사용 중인 여부")
public class UseCheckController {

    private final UseCheckService useCheckService;
    private final AES128Config aes128Config;

    @GetMapping("")
    @Operation(summary = "토큰 조회", description = "팀 이름을 통해 토큰 조회")
    public ResponseEntity<?> getToken(@RequestParam(name = "teamName") String teamName) {
        return ResponseEntity.ok(useCheckService.getToken(teamName));
    }

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
