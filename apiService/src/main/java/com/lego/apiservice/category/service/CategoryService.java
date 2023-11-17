package com.lego.apiservice.category.service;

import com.lego.apiservice.api.entity.dto.response.CategoryApiResponse;
import com.lego.apiservice.api.repostiory.ApiRepository;
import com.lego.apiservice.category.entity.domain.Category;
import com.lego.apiservice.category.entity.dto.response.CategoryListResponse;
import com.lego.apiservice.category.entity.dto.response.CategoryName;
import com.lego.apiservice.category.repository.CategoryRepository;
import com.lego.apiservice.useCheck.entity.domain.UseCheck;
import com.lego.apiservice.useCheck.repository.UseCheckRepository;
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
    private final UseCheckRepository useCheckRepository;

    public List<CategoryListResponse> allCategory() {
        List<CategoryListResponse> categoryList = new ArrayList<>();

        List<Category> categories = categoryRepository.findAll();

        categories.forEach(category -> {
            categoryList.add(new CategoryListResponse(category.getName(), category.getId(), category.getDescription(), apiToCategory(category)));
        });

        return categoryList;
    }

    public List<CategoryListResponse> provideCategory(String teamName) {
        List<CategoryListResponse> categoryList = new ArrayList<>();

        List<Category> categories = categoryRepository.findAllByServer(teamName);

        categories.forEach(category -> {
            categoryList.add(new CategoryListResponse(category.getName(), category.getId(), category.getDescription(), apiToCategory(category)));
        });

        return categoryList;
    }

    public List<CategoryListResponse> useCategory(String teamName) {
        List<CategoryListResponse> categoryList = new ArrayList<>();

        List<UseCheck> useChecks = useCheckRepository.findAllByTeamName(teamName);

        useChecks.forEach(useCheck -> {
            categoryList.add(new CategoryListResponse(useCheck.getCategory().getName(), useCheck.getCategory().getId(), useCheck.getCategory().getDescription(), apiToCategory(useCheck.getCategory())));
        });

        return categoryList;
    }

    public String categoryNameToId(Long id) {
        return categoryRepository.findById(id).orElseThrow().getName();
    }




    public List<CategoryApiResponse> apiToCategory(Category category) {
        return apiRepository.findAllByCategory(category).stream().map(CategoryApiResponse::new).collect(Collectors.toList());
    }

    public CategoryName categoryName(Long categoryId) {
        return new CategoryName(categoryRepository.findById(categoryId).orElseThrow());
    }

    public String categoryStringName(Long categoryId) {
        return categoryRepository.findById(categoryId).orElseThrow().getName();
    }
}
