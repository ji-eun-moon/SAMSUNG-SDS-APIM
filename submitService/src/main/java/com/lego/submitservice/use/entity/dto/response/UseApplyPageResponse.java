package com.lego.submitservice.use.entity.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UseApplyPageResponse {
    private List<UseApplyListResponse> useList = new ArrayList<>();
    private Integer page;
    private Integer totalPage;
}
