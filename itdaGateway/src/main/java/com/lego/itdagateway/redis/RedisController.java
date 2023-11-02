package com.lego.itdagateway.redis;

import com.lego.itdagateway.global.config.AES128Config;
import com.lego.itdagateway.global.exception.BusinessLogicException;
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
    private final AES128Config aes128Config;

    @GetMapping("/get")
    public ResponseEntity<?> getValue(@RequestParam(name = "key") String key){
        return ResponseEntity.ok(redisService.getValue(key));
    }

    @GetMapping("/set")
    public ResponseEntity<?> setValue(@RequestParam(name = "key") String key, @RequestParam(name = "value") String value){
        redisService.setValue(key,value);
        return ResponseEntity.ok(HttpStatus.CREATED);
    }

    @GetMapping("/encode")
    public ResponseEntity<?> encode(@RequestParam(name = "key") String key) throws BusinessLogicException {
        return ResponseEntity.ok(aes128Config.encryptAes(key));
    }

    @GetMapping("/decode")
    public ResponseEntity<?> decode(@RequestParam(name = "key") String key) throws BusinessLogicException {
        return ResponseEntity.ok(aes128Config.decryptAes(key));
    }
}
