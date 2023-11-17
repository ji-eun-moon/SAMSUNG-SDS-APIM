package com.lego.apiservice.useCheck.entity.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CategoryTokenResponse {

    public Long categoryId;
    public String categoryName;
    public String token;
}
