package com.lego.apiservice.usage.entity.dto.statistics;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ResponseCodeCategory {

    private String responseCode;
    private Integer count;
    private List<ApiCount> countList;
}
