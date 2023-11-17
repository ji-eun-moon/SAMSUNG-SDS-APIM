package com.lego.apiservice.api.entity.dto.response;

import com.lego.apiservice.api.entity.domain.Api;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ApiSearchResponse {

    private String apiName;
    private String apiAddress;
    private Long apiId;
    private String categoryName;
    private Long categoryId;

    public ApiSearchResponse(Api api) {
        this.apiName = api.getTitle();
        this.apiAddress = api.getEndpoint();
        this.apiId = api.getId();
        this.categoryName = api.getCategory().getName();
        this.categoryId = api.getCategory().getId();
    }
}
