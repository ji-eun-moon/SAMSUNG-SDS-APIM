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
    private Integer ResponseCode;
    private Long ResponseTime;

    public ResponseTimeResponse(ElasticUsage usage) {
        this.date = usage.getCreateAt();
        this.ResponseCode = usage.getResponseCode();
        this.ResponseTime = usage.getResponseTime();
    }
}
