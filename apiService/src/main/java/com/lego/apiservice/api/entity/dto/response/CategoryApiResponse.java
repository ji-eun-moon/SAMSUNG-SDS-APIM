package com.lego.apiservice.api.entity.dto.response;

import com.lego.apiservice.api.entity.domain.Api;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryApiResponse {

    private String apiName;
    private String apiAddress;
    private Long apiId;

    public CategoryApiResponse(Api api) {
        this.apiName = api.getTitle();
        this.apiAddress = api.getEndpoint();
        this.apiId = api.getId();
    }
}
