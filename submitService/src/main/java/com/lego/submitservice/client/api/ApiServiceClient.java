package com.lego.submitservice.client.api;

import com.lego.submitservice.client.api.dto.CategoryListResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "api-service")
public interface ApiServiceClient {

    @GetMapping("/category")
    List<CategoryListResponse> getAllCategory();
}
