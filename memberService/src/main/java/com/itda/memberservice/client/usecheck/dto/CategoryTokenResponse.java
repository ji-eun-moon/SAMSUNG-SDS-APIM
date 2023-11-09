package com.itda.memberservice.client.usecheck.dto;

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
