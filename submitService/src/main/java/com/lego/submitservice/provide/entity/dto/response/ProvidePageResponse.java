package com.lego.submitservice.provide.entity.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProvidePageResponse {
    private List<ProvideListResponse> provideList = new ArrayList<>();
    private Integer page;
    private Integer totalPage;
}
