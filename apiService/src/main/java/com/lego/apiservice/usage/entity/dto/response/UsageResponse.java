package com.lego.apiservice.usage.entity.dto.response;

import com.lego.apiservice.api.entity.domain.ApiMethod;
import com.lego.apiservice.usage.entity.domain.ElasticUsage;
import com.lego.apiservice.usage.entity.domain.Usage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UsageResponse {

    private Long usageId;
    private LocalDateTime createdAt;
    private ApiMethod method;
    private String endpoint;
    private String teamToken;
    private String categoryId;
    private Long responseTime;
    private String responseCode;

    public UsageResponse(Usage usage) {
        usageId = usage.get_id();
        createdAt = usage.getCreateAt();
        method = usage.getMethod();
        endpoint = usage.getEndpoint();
        teamToken = usage.getTeamToken();
        categoryId = usage.getCategoryId();
        responseTime = usage.getResponseTime();
        responseCode = usage.getResponseCode();
    }

}
