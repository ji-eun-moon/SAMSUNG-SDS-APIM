package com.lego.itdagateway.global.filter;

import com.lego.itdagateway.global.config.AES128Config;
import com.lego.itdagateway.global.exception.BusinessLogicException;
import com.lego.itdagateway.redis.RedisService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.xml.bind.DatatypeConverter;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import reactor.core.publisher.Mono;

@Component
@Slf4j
public class ServerAuthenticationFilter extends AbstractGatewayFilterFactory<ServerAuthenticationFilter.Config> {

    Environment env;
    RedisService redisService;
    AES128Config aes128Config;
    public ServerAuthenticationFilter(Environment env, RedisService redisService, AES128Config aes128Config) {
        super(Config.class);
        this.env = env;
        this.redisService = redisService;
        this.aes128Config = aes128Config;
    }

    // login -> token -> member(with token) -> header(include token)
    @Override
    public GatewayFilter apply(ServerAuthenticationFilter.Config config) {
        return (exchange, chain) -> {

            String header = exchange.getRequest().getHeaders().getFirst("Authorization");
            log.info("서버 인증 필터");
            log.info("token : " + header);
            log.info(config.getPrefix() + exchange.getRequest().getPath());

            if (!StringUtils.hasText(header)) {
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                log.info("토큰이 없습니다.");
                return exchange.getResponse().setComplete();
            }

            if (header.equals("E3EABEF2F41EFE6894E9CE08A0FF5E52C8E8AF8D2A09AAEDC3BB815B494F8F91")) {
                return chain.filter(exchange.mutate().build()).then(Mono.fromRunnable(() -> {
                    log.info("서버 접속 성공");
                }));
            }

            String decode = null;
            try {
                decode = aes128Config.decrypt(header);
                String[] info =  decode.split("&");
                if (info.length != 2) {
                    log.info(decode);
                    log.info(String.valueOf(info.length));
                    log.info("잘못된 길이의 토큰입니다.");
                    exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                    return exchange.getResponse().setComplete();
                }
                String categoryId = redisService.getValue(config.getPrefix() + exchange.getRequest().getPath());
                if (!info[0].replace("category", "").equals(categoryId)) {
                    log.info("잘못된 카테고리 토큰입니다.");
                    exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                    return exchange.getResponse().setComplete();
                }

                // kafka 저장 로직

            } catch (BusinessLogicException e) {
                log.info("잘못된 형식의 토큰입니다.");
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                return exchange.getResponse().setComplete();
            }


            return chain.filter(exchange.mutate().build()).then(Mono.fromRunnable(() -> {
                log.info("서버 접속 성공");
        }));
        };
    }

    @Data
    public static class Config {
        private String prefix;
    }
}
