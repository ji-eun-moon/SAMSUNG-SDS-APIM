package com.lego.submitservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class SubmitServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(SubmitServiceApplication.class, args);
    }

}
