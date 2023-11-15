package com.lego.apiservice.api.entity.dto.response;

import com.lego.apiservice.api.entity.domain.Api;
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
    private Long categoryId;
    private String categoryName;

    public ApiTestResponse(Api api) {
        this.apiId = api.getId();
        this.endpoint = api.getEndpoint();
        this.input = api.getInput();
        this.outputExample = api.getOutputExample();
        this.title = api.getTitle();
        this.categoryToken = "E3EABEF2F41EFE6894E9CE08A0FF5E52C8E8AF8D2A09AAEDC3BB815B494F8F91";
        this.method = api.getApiMethod();
        this.categoryId = api.getCategory().getId();
        this.categoryName = api.getCategory().getName();
    }
}
