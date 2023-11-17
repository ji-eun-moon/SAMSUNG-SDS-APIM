package com.lego.apiservice.api.entity.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ApiStatusListResponse {
    private List<ApiStatusResponse> apiStatusResponses = new ArrayList<>();
    private Integer page;
    private Integer totalPage;
}
