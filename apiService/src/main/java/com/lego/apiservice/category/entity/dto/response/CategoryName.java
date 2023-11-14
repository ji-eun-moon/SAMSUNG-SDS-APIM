package com.lego.apiservice.category.entity.dto.response;

import com.lego.apiservice.category.entity.domain.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CategoryName {
    private Long categoryId;
    private String categoryName;

    public CategoryName(Category category) {
        this.categoryId = category.getId();
        this.categoryName = category.getName();
    }
}
