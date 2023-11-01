package com.lego.itdagateway.global.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.Cookie;
import jakarta.xml.bind.DatatypeConverter;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.protocol.HTTP;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpCookie;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import reactor.core.publisher.Mono;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;

@Component
@Slf4j
public class AuthorizationHeaderFilter extends AbstractGatewayFilterFactory<AuthorizationHeaderFilter.Config> {

    @Value("${security.jwt.secret.key}")
    private String secretKey;

    Environment env;

    public AuthorizationHeaderFilter(Environment env) {
        super(Config.class);
        this.env = env;
    }

    // login -> token -> member(with token) -> header(include token)
    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {

            String BearerToken = exchange.getRequest().getHeaders().getFirst("Authorization");
            log.info("BearerToken" + BearerToken);


            if (!StringUtils.hasText(BearerToken)) {
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                log.info("토큰이 없습니다.");
                return exchange.getResponse().setComplete();
            }

            if(!BearerToken.startsWith("Bearer")){
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                log.info("올바른 형식의 토큰이 아닙니다.");
                return exchange.getResponse().setComplete();
            }

            String token = BearerToken.split(" ")[1];
            try {
                byte[] secretKeyByte = DatatypeConverter.parseBase64Binary(secretKey);

                Key key = new SecretKeySpec(secretKeyByte, SignatureAlgorithm.HS256.getJcaName());

                String employeeId = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().get("id")
                        .toString();

                log.info("employee-Id : " + employeeId);
                ServerHttpRequest request = exchange.getRequest().mutate().header("member-id", employeeId).build();
                return chain.filter(exchange.mutate().request(request).build()).then(Mono.fromRunnable(() -> {
                    log.info("회원 인증 성공");
                }));

                // 여기에서 필요한 경우 JWT 클레임을 추가적으로 검사할 수 있습니다.
            } catch (Exception e) {
                log.error("JWT validation failed", e);
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                return exchange.getResponse().setComplete();
            }
        };
    }

    public static class Config {
    }
}
