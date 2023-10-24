package com.lego.apiservice.api.entity.dto.response;

import com.lego.apiservice.api.entity.domain.ApiMethod;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ApiTestResponse {

    private Long apiId;
    private String endpoint;
    private String input;
    private String outputExample;
    private String title;
    private ApiMethod method;
    private String categoryToken;
}
