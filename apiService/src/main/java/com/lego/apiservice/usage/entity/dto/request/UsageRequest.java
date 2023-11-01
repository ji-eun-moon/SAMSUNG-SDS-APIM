package com.lego.apiservice.usage.entity.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UsageRequest {

    private Long categoryId;
    private String teamName;
}
