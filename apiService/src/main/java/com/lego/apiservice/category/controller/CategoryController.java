package com.lego.apiservice.category.controller;

import com.lego.apiservice.category.entity.dto.response.CategoryListResponse;
import com.lego.apiservice.category.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

//    @GetMapping("/use")
//    public ResponseEntity<?> UseCategory() {
//        List<CategoryListResponse> responses = new ArrayList<>();
//        responses.add(new CategoryListResponse("도하의 api 카테고리", 1L, "도하가 개발한 api들"));
//        responses.add(new CategoryListResponse("시온의 api 카테고리", 1L, "시온이 개발한 api들"));
//
//        return ResponseEntity.ok(responses);
//    }
//
    @GetMapping("/provide")
    public ResponseEntity<?> ProvideCategory(@RequestHeader("member-id") String employeeId) {
        return ResponseEntity.ok(categoryService.provideCategory(employeeId));
    }
}
