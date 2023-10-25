package com.lego.apiservice.category.controller;

import com.lego.apiservice.category.entity.dto.response.CategoryListResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryController {

    // 카테고리 조회 리스트 형태 CategoryListResponse
    @GetMapping("")
    public ResponseEntity<?> allCategory() {
        List<CategoryListResponse> responses = new ArrayList<>();
        responses.add(new CategoryListResponse("도하의 api 카테고리", 1L, "도하가 개발한 api들"));
        responses.add(new CategoryListResponse("시온의 api 카테고리", 1L, "시온이 개발한 api들"));

        return ResponseEntity.ok(responses);
    }
}
