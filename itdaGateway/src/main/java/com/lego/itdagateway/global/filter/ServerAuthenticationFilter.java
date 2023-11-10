package com.lego.itdagateway.global.filter;

import com.lego.itdagateway.global.config.AES128Config;
import com.lego.itdagateway.global.exception.BusinessLogicException;
import com.lego.itdagateway.messageQueue.CreateUsageRequest;
import com.lego.itdagateway.messageQueue.KafkaProducer;
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

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Component
@Slf4j
public class ServerAuthenticationFilter extends AbstractGatewayFilterFactory<ServerAuthenticationFilter.Config> {

    Environment env;
    RedisService redisService;
    AES128Config aes128Config;
    KafkaProducer kafkaProducer;

    @Value("${topic}")
    private String topic;

    public ServerAuthenticationFilter(Environment env, RedisService redisService, AES128Config aes128Config,
                                      KafkaProducer kafkaProducer) {
        super(Config.class);
        this.env = env;
        this.redisService = redisService;
        this.aes128Config = aes128Config;
        this.kafkaProducer = kafkaProducer;
    }

    // login -> token -> member(with token) -> header(include token)
    @Override
    public GatewayFilter apply(ServerAuthenticationFilter.Config config) {
        return (exchange, chain) -> {
            long startTime = System.currentTimeMillis();

            String header = exchange.getRequest().getHeaders().getFirst("Authorization");
            log.info(config.getPrefix() + exchange.getRequest().getPath());

            if (!StringUtils.hasText(header)) {
                log.info("토큰이 없습니다.");
                long responseTime = System.currentTimeMillis() - startTime;
                Map<String, String> map = new HashMap<>();
                map.put("createdAt", String.valueOf(LocalDateTime.now()));
                map.put("method", exchange.getRequest().getMethod().toString());
                map.put("endpoint",  config.getPrefix() + exchange.getRequest().getPath());
                map.put("ResponseTime", String.valueOf(responseTime));
                map.put("ResponseCode", "401");
                map.put("remoteAddr", String.valueOf(exchange.getRequest().getRemoteAddress()));
                kafkaProducer.send(topic, map);
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                return exchange.getResponse().setComplete();
            }

            if (header.equals("E3EABEF2F41EFE6894E9CE08A0FF5E52C8E8AF8D2A09AAEDC3BB815B494F8F91")) {
                return chain.filter(exchange.mutate().build()).then(Mono.fromRunnable(() -> {

                }));
            }

            String decode = null;
            Long categorySeq = null;
            String teamName = null;
            try {
                decode = aes128Config.decrypt(header);
                String[] info =  decode.split("&");
                if (info.length != 2) {
                    log.info("잘못된 길이의 토큰입니다.");
                    long responseTime = System.currentTimeMillis() - startTime;
                    Map<String, String> map = new HashMap<>();
                    map.put("createdAt", String.valueOf(LocalDateTime.now()));
                    map.put("method", exchange.getRequest().getMethod().toString());
                    map.put("endpoint",  config.getPrefix() + exchange.getRequest().getPath());
                    map.put("ResponseTime", String.valueOf(responseTime));
                    map.put("ResponseCode", "401");
                    map.put("remoteAddr", String.valueOf(exchange.getRequest().getRemoteAddress()));

                    kafkaProducer.send("topic", map);
                    exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                    return exchange.getResponse().setComplete();
                }
                String categoryId = redisService.getValue(config.getPrefix() + exchange.getRequest().getPath());
                if (!info[0].replace("category", "").equals(categoryId)) {
                    log.info("잘못된 카테고리 토큰입니다.");
                    long responseTime = System.currentTimeMillis() - startTime;
                    Map<String, String> map = new HashMap<>();
                    map.put("createdAt", String.valueOf(LocalDateTime.now()));
                    map.put("method", exchange.getRequest().getMethod().toString());
                    map.put("endpoint",  config.getPrefix() + exchange.getRequest().getPath());
                    map.put("ResponseTime", String.valueOf(responseTime));
                    map.put("ResponseCode", "401");
                    map.put("remoteAddr", String.valueOf(exchange.getRequest().getRemoteAddress()));

                    kafkaProducer.send(topic, map);
                    exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                    return exchange.getResponse().setComplete();
                }

                // kafka 저장 로직
                categorySeq = Long.valueOf(info[0].replace("category", ""));
                teamName = info[1].replace("teamName", "");

            } catch (BusinessLogicException e) {
                log.info("잘못된 형식의 토큰입니다.");
                long responseTime = System.currentTimeMillis() - startTime;
                Map<String, String> map = new HashMap<>();
                map.put("createdAt", String.valueOf(LocalDateTime.now()));
                map.put("method", exchange.getRequest().getMethod().toString());
                map.put("endpoint",  config.getPrefix() + exchange.getRequest().getPath());
                map.put("ResponseTime", String.valueOf(responseTime));
                map.put("ResponseCode", "401");
                map.put("remoteAddr", String.valueOf(exchange.getRequest().getRemoteAddress()));

                kafkaProducer.send(topic, map);
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                return exchange.getResponse().setComplete();
            }


            String finalTeamName = teamName;
            Long finalCategorySeq = categorySeq;
            return chain.filter(exchange.mutate().build()).then(Mono.fromRunnable(() -> {

                log.info("서버 접속 성공");
//                log.info("ResponseCode " + exchange.getResponse().getStatusCode().value());
//                log.info("ResponseTime " + responseTime);
//                log.info("CreatedAt " + LocalDateTime.now());
//                log.info("endpoint " + config.getPrefix() + exchange.getRequest().getPath());
//                log.info("method " + exchange.getRequest().getMethod());
//                log.info("categoryId " + finalCategorySeq);
//                log.info("remoteAddr " + exchange.getRequest().getLocalAddress());
//                log.info("remoteAddr " + exchange.getRequest().getRemoteAddress());
                long responseTime = System.currentTimeMillis() - startTime;
                Map<String, String> map = new HashMap<>();
                map.put("createdAt", String.valueOf(LocalDateTime.now()));
                map.put("method", exchange.getRequest().getMethod().toString());
                map.put("endpoint",  config.getPrefix() + exchange.getRequest().getPath());
                map.put("teamName", finalTeamName);
                map.put("categoryId", String.valueOf(finalCategorySeq));
                map.put("ResponseTime", String.valueOf(responseTime));
                map.put("ResponseCode", String.valueOf(exchange.getResponse().getStatusCode().value()));
                map.put("remoteAddr", String.valueOf(exchange.getRequest().getRemoteAddress()));

                kafkaProducer.send(topic, map);
            }));
        };
    }

    @Data
    public static class Config {
        private String prefix;
    }
}
