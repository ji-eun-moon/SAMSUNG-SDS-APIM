package com.lego.submitservice.use.entity.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateUseRequest {

    private String teamName;
    private Long categoryId;
    private String content;
}

