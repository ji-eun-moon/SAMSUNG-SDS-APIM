package com.lego.apiservice.usage.entity.dto.statistics;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ResponseCodeResponse {

    private String responseCode;
    private Integer count;
}
