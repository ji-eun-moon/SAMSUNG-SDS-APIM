package com.lego.apiservice.usage.entity.dto.response;

import com.lego.apiservice.api.entity.domain.ApiMethod;
import com.lego.apiservice.usage.entity.domain.ElasticUsage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.elasticsearch.annotations.DateFormat;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ElasticUsageResponse {

    private String usageId;
    private LocalDateTime createdAt;
    private ApiMethod method;
    private String endpoint;
    private String teamName;
    private Long categoryId;
    private Long responseTime;
    private String responseCode;

    public ElasticUsageResponse(ElasticUsage usage) {
        usageId = usage.get_id();
        createdAt = usage.getCreatedAt();
        method = usage.getMethod();
        endpoint = usage.getEndpoint();
        teamName = usage.getTeamName();
        categoryId = usage.getCategoryId();
        responseTime = usage.getResponseTime();
        responseCode = usage.getResponseCode();
    }
}
