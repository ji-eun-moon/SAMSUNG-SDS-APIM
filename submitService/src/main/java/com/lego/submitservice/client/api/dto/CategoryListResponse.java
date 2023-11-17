package com.lego.submitservice.client.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CategoryListResponse {

    private String categoryName;
    private Long categoryId;
    private String description;
}
