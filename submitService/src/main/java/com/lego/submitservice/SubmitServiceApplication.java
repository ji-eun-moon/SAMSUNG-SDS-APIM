package com.lego.submitservice;

import com.lego.submitservice.client.exception.FeignErrorDecoder;
import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

import java.util.TimeZone;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class SubmitServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(SubmitServiceApplication.class, args);
    }

    @Bean
    public System.Logger.Level feignLoggerLevel() {
        return System.Logger.Level.ALL;
    }

    @Bean
    public FeignErrorDecoder getFeignErrorDecoder() {
        return new FeignErrorDecoder();
    }

    @PostConstruct
    public void started() {
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
    }
}
