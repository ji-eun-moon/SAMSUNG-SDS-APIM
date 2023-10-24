package com.lego.submitservice.use.entity.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateUseRequest {

    private Long teamId;
    private Long categoryId;
    private String content;
}

