package com.lego.apiservice.api.service;

import com.lego.apiservice.api.entity.domain.Api;
import com.lego.apiservice.api.entity.domain.ApiStatus;
import com.lego.apiservice.api.entity.dto.response.ApiDetailResponse;
import com.lego.apiservice.api.entity.dto.response.ApiSearchResponse;
import com.lego.apiservice.api.entity.dto.response.ApiStatusResponse;
import com.lego.apiservice.api.entity.dto.response.ApiTestResponse;
import com.lego.apiservice.api.repostiory.ApiRepository;
import com.lego.apiservice.category.repository.CategoryRepository;
import com.lego.apiservice.useCheck.repository.UseCheckRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class ApiService {

    private final ApiRepository apiRepository;
    private final CategoryRepository categoryRepository;
    private final UseCheckRepository useCheckRepository;

    public ApiDetailResponse apiDetail(Long apiId, String teamName) {
        Api api = apiRepository.findById(apiId).orElseThrow();
        ApiDetailResponse apiDetailResponse = new ApiDetailResponse(api);
        apiDetailResponse.setAvailableCheck(useCheckRepository.findByTeamNameAndCategory(teamName, api.getCategory().getId()).isEmpty());

        return apiDetailResponse;
    }

    public ApiTestResponse apiTest(Long apiId) {
        return new ApiTestResponse(apiRepository.findById(apiId).orElseThrow());
    }

    public List<ApiSearchResponse> apiSearch(String title) {
        return apiRepository.findAllByTitleContainingIgnoreCase(title).stream().map(ApiSearchResponse::new).collect(Collectors.toList());
    }

    public List<ApiSearchResponse> apiAll() {
        return apiRepository.findAll().stream().map(ApiSearchResponse::new).collect(Collectors.toList());
    }

    public Page<ApiStatusResponse> apiStatusAll(Pageable pageable) {
        return apiRepository.findAllByOrderByUpdatedAtDesc(pageable).map(ApiStatusResponse::new);
    }

    public Page<ApiStatusResponse> apiStatusByStatus(ApiStatus apiStatus, Pageable pageable) {
        return apiRepository.findAllByApiStatusOrderByUpdatedAtDesc(apiStatus, pageable).map(ApiStatusResponse::new);
    }

}
