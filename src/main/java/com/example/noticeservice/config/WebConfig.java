package com.example.noticeservice.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("https://k9c201.p.ssafy.io",
                        "http://localhost:3000")
                .allowedHeaders("*")
                .allowedMethods("OPTIONS", "HEAD", "GET", "PATCH", "POST", "PUT", "DELETE");
    }

}
