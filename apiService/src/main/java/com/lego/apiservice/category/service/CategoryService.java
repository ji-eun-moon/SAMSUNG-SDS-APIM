package com.lego.apiservice.category.service;

import com.lego.apiservice.api.entity.dto.response.CategoryApiResponse;
import com.lego.apiservice.api.repostiory.ApiRepository;
import com.lego.apiservice.category.entity.domain.Category;
import com.lego.apiservice.category.entity.dto.response.CategoryListResponse;
import com.lego.apiservice.category.repository.CategoryRepository;
import com.lego.apiservice.usage.entity.domain.Usage;
import com.lego.apiservice.usage.repository.UsageRepository;
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
    private final UsageRepository usageRepository;

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

    public List<CategoryListResponse> useCategory(String teamName) {
        List<CategoryListResponse> categoryList = new ArrayList<>();

        List<Usage> usages = usageRepository.findAllByTeamName(teamName);

        usages.forEach(usage -> {
            categoryList.add(new CategoryListResponse(usage.getCategory().getName(), usage.getCategory().getId(), usage.getCategory().getDescription(), apiToCategory(usage.getCategory())));
        });

        return categoryList;
    }




    public List<CategoryApiResponse> apiToCategory(Category category) {
        return apiRepository.findAllByCategory(category).stream().map(CategoryApiResponse::new).collect(Collectors.toList());
    }
}
