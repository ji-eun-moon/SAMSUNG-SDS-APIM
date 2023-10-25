package com.lego.apiservice.api.entity.dto.response;

import com.lego.apiservice.api.entity.domain.ApiMethod;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ApiDetailResponse {

    private Long apiId;
    private String endpoint;
    private String input;
    private String inputExample;
    private String output;
    private String outputExample;
    private String title;
    private String content;
    private ApiMethod method;

    // 사용 가능 하면 true
    private boolean availableCheck;
}