package com.lego.apiservice.category.controller;

import com.lego.apiservice.category.entity.dto.response.CategoryListResponse;
import com.lego.apiservice.category.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    // 카테고리 조회 리스트 형태 CategoryListResponse
    @GetMapping("")
    public ResponseEntity<?> allCategory() {
        return ResponseEntity.ok(categoryService.allCategory());
    }

    @GetMapping("/use")
    public ResponseEntity<?> UseCategory(@RequestParam(name = "teamName") String teamName) {
        return ResponseEntity.ok(categoryService.useCategory(teamName));
    }

    @GetMapping("/provide")
    public ResponseEntity<?> ProvideCategory(@RequestParam(name = "teamName") String teamName) {
        return ResponseEntity.ok(categoryService.provideCategory(teamName));
    }

    @GetMapping("/category-name")
    public ResponseEntity<?> CategoryNameToId(@RequestParam Long categoryId) {
        return ResponseEntity.ok(categoryService.categoryNameToId(categoryId));
    }

}
