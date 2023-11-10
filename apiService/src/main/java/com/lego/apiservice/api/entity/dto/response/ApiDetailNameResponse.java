package com.lego.apiservice.api.entity.dto.response;

import com.lego.apiservice.api.entity.domain.Api;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ApiDetailNameResponse {

    public String apiName;
    public Long categoryId;
    public ApiDetailNameResponse(Api api) {
        this.apiName = api.getTitle();
        this.categoryId = api.getCategory().getId();
    }
}
