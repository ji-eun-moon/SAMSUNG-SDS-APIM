package com.lego.apiservice.api.entity.dto.response;

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
}
