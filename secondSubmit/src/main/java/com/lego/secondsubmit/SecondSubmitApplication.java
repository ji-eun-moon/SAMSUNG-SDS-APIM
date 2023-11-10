package com.lego.secondsubmit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class SecondSubmitApplication {

    public static void main(String[] args) {
        SpringApplication.run(SecondSubmitApplication.class, args);
    }

}
