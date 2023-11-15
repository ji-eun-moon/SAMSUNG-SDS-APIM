package com.lego.apiservice.api.entity.dto.response;

import com.lego.apiservice.api.entity.domain.Api;
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
    private String output;
    private String outputExample;
    private String title;
    private String content;
    private ApiMethod method;
    private Long categoryId;
    private String categoryName;

    public ApiDetailResponse(Api api) {
        this.apiId = api.getId();
        this.endpoint = api.getEndpoint();
        this.input = api.getInput();
        this.output = api.getOutput();
        this.outputExample = api.getOutputExample();
        this.title = api.getTitle();
        this.content = api.getContent();
        this.method = api.getApiMethod();
        this.categoryId = api.getCategory().getId();
        this.categoryName = api.getCategory().getName();
    }

}
