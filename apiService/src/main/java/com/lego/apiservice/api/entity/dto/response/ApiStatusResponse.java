package com.lego.apiservice.api.entity.dto.response;

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
    private double responseTime;
}
