package com.lego.apiservice.usage.entity.dto.request;

import com.lego.apiservice.api.entity.domain.ApiMethod;
import com.lego.apiservice.usage.entity.domain.Usage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateUsageRequest {

    private LocalDateTime createAt;
    private ApiMethod method;
    private String endpoint;
    private String teamToken;
    private Long categoryId;
    private Long responseTime;
    private Integer responseCode;

}
