package com.lego.apiservice.usage.entity.dto.statistics;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ApiCount {

    private Long apiId;
    private String title;
    private Integer count;
}
