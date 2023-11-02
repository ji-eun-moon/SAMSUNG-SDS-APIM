package com.lego.apiservice.api.entity.dto.response;

import com.lego.apiservice.api.entity.domain.Api;
import com.lego.apiservice.api.entity.domain.ApiStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ApiStatusResponse {

    private String apiName;
    private String apiAddress;
    private Long apiId;
    private String categoryName;
    private Long categoryId;
    private ApiStatus apiStatus;
    private LocalDateTime updatedAt;
    private String responseTime;

    public ApiStatusResponse(Api api) {
        this.apiName = api.getTitle();
        this.apiAddress = api.getEndpoint();
        this.apiId = api.getId();
        this.categoryName = api.getCategory().getName();
        this.categoryId = api.getCategory().getId();
        this.apiStatus = api.getApiStatus();
        this.updatedAt = api.getUpdatedAt();
        this.responseTime = api.getResponseTime();
    }
}
