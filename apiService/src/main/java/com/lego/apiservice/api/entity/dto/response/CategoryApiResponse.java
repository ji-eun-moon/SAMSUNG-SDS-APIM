package com.lego.apiservice.api.entity.dto.response;

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
}
