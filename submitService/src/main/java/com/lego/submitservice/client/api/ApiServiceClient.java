package com.lego.submitservice.client.api;

import com.lego.submitservice.client.api.dto.CategoryListResponse;
import com.lego.submitservice.client.api.dto.CreateServerRequest;
import com.lego.submitservice.client.api.dto.UseCheckRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;
import java.util.Map;

@FeignClient(name = "api-service")
public interface ApiServiceClient {

    @GetMapping("/category")
    List<CategoryListResponse> getAllCategory();

    @PostMapping("/register")
    HttpStatus register(CreateServerRequest createServerRequest);

    @PostMapping("/use-check/register")
    HttpStatus useCheckRegister(UseCheckRequest useCheckRequest);

    @GetMapping("/category/category-name")
    String categoryNameToId(@SpringQueryMap Map<String, String> params);
}
