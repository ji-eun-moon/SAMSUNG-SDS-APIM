package com.lego.apiservice.category.entity.dto.response;

import com.lego.apiservice.api.entity.dto.response.CategoryApiResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CategoryListResponse {

    private String categoryName;
    private Long categoryId;
    private String description;
    private List<CategoryApiResponse> apiList;
}
