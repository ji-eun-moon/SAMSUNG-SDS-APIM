package com.lego.apiservice.category.service;

import com.lego.apiservice.api.entity.dto.response.CategoryApiResponse;
import com.lego.apiservice.api.repostiory.ApiRepository;
import com.lego.apiservice.category.entity.domain.Category;
import com.lego.apiservice.category.entity.dto.response.CategoryListResponse;
import com.lego.apiservice.category.repository.CategoryRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final ApiRepository apiRepository;

    public List<CategoryListResponse> allCategory() {
        List<CategoryListResponse> categoryList = new ArrayList<>();

        List<Category> categories = categoryRepository.findAll();

        categories.forEach(category -> {
            categoryList.add(new CategoryListResponse(category.getName(), category.getId(), category.getDescription(), apiToCategory(category)));
        });

        return categoryList;
    }

    public List<CategoryListResponse> provideCategory(String employeeId) {
        List<CategoryListResponse> categoryList = new ArrayList<>();

        List<Category> categories = categoryRepository.findAllByServer(employeeId);

        categories.forEach(category -> {
            categoryList.add(new CategoryListResponse(category.getName(), category.getId(), category.getDescription(), apiToCategory(category)));
        });

        return categoryList;
    }



    public List<CategoryApiResponse> apiToCategory(Category category) {
        return apiRepository.findAllByCategory(category).stream().map(CategoryApiResponse::new).collect(Collectors.toList());
    }
}
