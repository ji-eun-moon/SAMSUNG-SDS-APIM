package com.lego.apiservice.redis.controller;

import com.lego.apiservice.redis.service.RedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/redis")
public class RedisController {

    private final RedisService redisService;

    @GetMapping("/get")
    public ResponseEntity<?> getValue(@RequestParam(name = "key") String key){
        return ResponseEntity.ok(redisService.getValue(key));
    }

    @GetMapping("/set")
    public ResponseEntity<?> setValue(@RequestParam(name = "key") String key, @RequestParam(name = "value") String value){
        redisService.setValue(key,value);
        return ResponseEntity.ok(HttpStatus.CREATED);
    }
}
