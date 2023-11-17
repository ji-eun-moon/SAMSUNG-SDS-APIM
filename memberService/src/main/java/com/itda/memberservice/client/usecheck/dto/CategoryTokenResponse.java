package com.itda.memberservice.client.usecheck.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CategoryTokenResponse {

    private Long categoryId;
    private String categoryName;
    private String token;
}
