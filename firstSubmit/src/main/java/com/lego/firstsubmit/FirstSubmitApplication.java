package com.lego.firstsubmit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class FirstSubmitApplication {

    public static void main(String[] args) {
        SpringApplication.run(FirstSubmitApplication.class, args);
    }

}
