package com.lego.apiservice.usage.entity.dto.statistics;

import com.lego.apiservice.usage.entity.domain.ElasticUsage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ResponseTimeResponse {

    private LocalDateTime date;
    private String ResponseCode;
    private Long ResponseTime;

    public ResponseTimeResponse(ElasticUsage usage) {
        this.date = usage.getCreatedAt().plusHours(9);
        this.ResponseCode = usage.getResponseCode();
        this.ResponseTime = usage.getResponseTime();
    }
}
