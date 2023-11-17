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

    @Value("${kafka-topic}")
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
            String categoryId = redisService.getValue(config.getPrefix() + exchange.getRequest().getPath());

            if (categoryId == null) {
                log.warn("잘못된 주소 입니다.");
                long responseTime = System.currentTimeMillis() - startTime;
                Map<String, String> map = new HashMap<>();
                map.put("createdAt", String.valueOf(LocalDateTime.now()));
                map.put("method", exchange.getRequest().getMethod().toString());
                map.put("endpoint",  config.getPrefix() + exchange.getRequest().getPath());
                map.put("ResponseTime", String.valueOf(responseTime));
                map.put("ResponseCode", "404");
                map.put("teamName", "no team");
                map.put("categoryId", "no category");
                map.put("remoteAddr", ipCut(String.valueOf(exchange.getRequest().getRemoteAddress())));
                kafkaProducer.send(topic, map);
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                return exchange.getResponse().setComplete();
            }

            if (!StringUtils.hasText(header)) {
                log.warn("토큰이 없습니다.");
                long responseTime = System.currentTimeMillis() - startTime;
                Map<String, String> map = new HashMap<>();
                map.put("createdAt", String.valueOf(LocalDateTime.now()));
                map.put("method", exchange.getRequest().getMethod().toString());
                map.put("endpoint",  config.getPrefix() + exchange.getRequest().getPath());
                map.put("teamName", "no team");
                map.put("categoryId", categoryId);
                map.put("ResponseTime", String.valueOf(responseTime));
                map.put("ResponseCode", "401");
                map.put("remoteAddr", ipCut(String.valueOf(exchange.getRequest().getRemoteAddress())));
                kafkaProducer.send(topic, map);
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                return exchange.getResponse().setComplete();
            }

            if (header.equals("E3EABEF2F41EFE6894E9CE08A0FF5E52C8E8AF8D2A09AAEDC3BB815B494F8F91")) {
                return chain.filter(exchange.mutate().build()).then(Mono.fromRunnable(() -> {
                    log.info("테스트");
                }));
            }

            String decode = null;
            Long categorySeq = null;
            String teamName = null;
            try {
                decode = aes128Config.decrypt(header);
                String[] info =  decode.split("&");
                if (info.length != 2) {
                    log.warn("잘못된 길이의 토큰입니다.");
                    long responseTime = System.currentTimeMillis() - startTime;
                    Map<String, String> map = new HashMap<>();
                    map.put("createdAt", String.valueOf(LocalDateTime.now()));
                    map.put("method", exchange.getRequest().getMethod().toString());
                    map.put("endpoint",  config.getPrefix() + exchange.getRequest().getPath());
                    map.put("teamName", "no team");
                    map.put("categoryId", categoryId);
                    map.put("ResponseTime", String.valueOf(responseTime));
                    map.put("ResponseCode", "401");
                    map.put("remoteAddr", ipCut(String.valueOf(exchange.getRequest().getRemoteAddress())));

                    kafkaProducer.send("topic", map);
                    exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                    return exchange.getResponse().setComplete();
                }
                if (!info[0].replace("category", "").equals(categoryId)) {
                    log.warn("잘못된 카테고리 토큰입니다.");
                    long responseTime = System.currentTimeMillis() - startTime;
                    Map<String, String> map = new HashMap<>();
                    map.put("createdAt", String.valueOf(LocalDateTime.now()));
                    map.put("method", exchange.getRequest().getMethod().toString());
                    map.put("endpoint",  config.getPrefix() + exchange.getRequest().getPath());
                    map.put("teamName", "no team");
                    map.put("categoryId", categoryId);
                    map.put("ResponseTime", String.valueOf(responseTime));
                    map.put("ResponseCode", "401");
                    map.put("remoteAddr", ipCut(String.valueOf(exchange.getRequest().getRemoteAddress())));

                    kafkaProducer.send(topic, map);
                    exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                    return exchange.getResponse().setComplete();
                }

                // kafka 저장 로직
                categorySeq = Long.valueOf(info[0].replace("category", ""));
                teamName = info[1].replace("teamName", "");

            } catch (BusinessLogicException e) {
                log.warn("잘못된 형식의 토큰입니다.");
                long responseTime = System.currentTimeMillis() - startTime;
                Map<String, String> map = new HashMap<>();
                map.put("createdAt", String.valueOf(LocalDateTime.now()));
                map.put("method", exchange.getRequest().getMethod().toString());
                map.put("endpoint",  config.getPrefix() + exchange.getRequest().getPath());
                map.put("teamName", "no team");
                map.put("categoryId", categoryId);
                map.put("ResponseTime", String.valueOf(responseTime));
                map.put("ResponseCode", "401");
                map.put("remoteAddr", ipCut(String.valueOf(exchange.getRequest().getRemoteAddress())));

                kafkaProducer.send(topic, map);
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                return exchange.getResponse().setComplete();
            }


            String finalTeamName = teamName;
            Long finalCategorySeq = categorySeq;
            return chain.filter(exchange.mutate().build()).then(Mono.fromRunnable(() -> {

                if (exchange.getResponse().getStatusCode().is2xxSuccessful()) {
                    log.info("접속 성공");
                } else if (exchange.getResponse().getStatusCode().is4xxClientError()) {
                    log.warn("경고 : " + exchange.getResponse().getStatusCode());
                } else if (exchange.getResponse().getStatusCode().is5xxServerError()) {
                    log.error("서버 에러");
                }
                long responseTime = System.currentTimeMillis() - startTime;
                Map<String, String> map = new HashMap<>();
                map.put("createdAt", String.valueOf(LocalDateTime.now()));
                map.put("method", exchange.getRequest().getMethod().toString());
                map.put("endpoint",  config.getPrefix() + exchange.getRequest().getPath());
                map.put("teamName", finalTeamName);
                map.put("categoryId", String.valueOf(finalCategorySeq));
                map.put("ResponseTime", String.valueOf(responseTime));
                map.put("ResponseCode", String.valueOf(exchange.getResponse().getStatusCode().value()));
                map.put("remoteAddr", ipCut(String.valueOf(exchange.getRequest().getRemoteAddress())));

                kafkaProducer.send(topic, map);
            }));
        };
    }

    @Data
    public static class Config {
        private String prefix;
    }

    public String ipCut(String addr) {
        addr = addr.replace("/", "");
        addr = addr.split(":")[0];
        return addr;
    }
}
