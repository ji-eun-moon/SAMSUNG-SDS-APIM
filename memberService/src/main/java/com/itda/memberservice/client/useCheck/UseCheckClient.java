package com.itda.memberservice.client.useCheck;

import com.itda.memberservice.client.useCheck.dto.CategoryTokenResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Map;

@FeignClient(name = "api-service")
public interface UseCheckClient {

    @GetMapping("/use-check")
    List<CategoryTokenResponse> getToken(@SpringQueryMap Map<String, String> map);

}
