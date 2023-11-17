package com.lego.apiservice.category.controller;

import com.lego.apiservice.category.entity.dto.response.CategoryListResponse;
import com.lego.apiservice.category.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
@Tag(name = "CATEGORY", description = "API의 묶음들의 관련")
public class CategoryController {

    private final CategoryService categoryService;

    // 카테고리 조회 리스트 형태 CategoryListResponse
    @GetMapping("")
    @Operation(summary = "전제 조회")
    public ResponseEntity<?> allCategory() {
        return ResponseEntity.ok(categoryService.allCategory());
    }

    @GetMapping("/use")
    @Operation(summary = "사용중인 묶음 조회")
    public ResponseEntity<?> UseCategory(@RequestParam(name = "teamName") String teamName) {
        return ResponseEntity.ok(categoryService.useCategory(teamName));
    }

    @GetMapping("/provide")
    @Operation(summary = "제공중인 묶음 조회")
    public ResponseEntity<?> ProvideCategory(@RequestParam(name = "teamName") String teamName) {
        return ResponseEntity.ok(categoryService.provideCategory(teamName));
    }

    @GetMapping("/category-name")
    @Operation(summary = "카테고리 시퀀스를 통해 이름 조회")
    public ResponseEntity<?> CategoryNameToId(@RequestParam Long categoryId) {
        return ResponseEntity.ok(categoryService.categoryStringName(categoryId));
    }

    @GetMapping("/category-name-object")
    @Operation(summary = "카테고리 시퀀스를 통해 이름 조회")
    public ResponseEntity<?> CategoryNameToIdObject(@RequestParam Long categoryId) {
        return ResponseEntity.ok(categoryService.categoryName(categoryId));
    }

}
