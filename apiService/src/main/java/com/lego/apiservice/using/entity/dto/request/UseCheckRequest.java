package com.lego.apiservice.using.entity.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UseCheckRequest {

    private Long categoryId;
    private String teamName;
}
