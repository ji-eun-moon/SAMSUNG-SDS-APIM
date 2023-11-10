package com.lego.apiservice.api.service;

import com.lego.apiservice.api.entity.domain.Api;
import com.lego.apiservice.api.entity.domain.ApiStatus;
import com.lego.apiservice.api.entity.dto.response.*;
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

    public ApiDetailResponse apiDetail(Long apiId) {
        Api api = apiRepository.findById(apiId).orElseThrow();
        return new ApiDetailResponse(api);
    }

    public ApiDetailNameResponse apiDetailName(Long apiId) {
        Api api = apiRepository.findById(apiId).orElseThrow();
        return new ApiDetailNameResponse(api);
    }

    public boolean apiAvailable(Long apiId, String teamName) {
        return useCheckRepository.findByTeamNameAndCategory(teamName, apiRepository.findById(apiId).orElseThrow().getCategory().getId()).isEmpty();
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

    public Page<ApiStatusResponse> apiStatusAll(ApiStatus apiStatus, Pageable pageable) {
        return apiRepository.findAllByApiStatusOrderByUpdatedAtDesc(apiStatus, pageable).map(ApiStatusResponse::new);
    }

    public Page<ApiStatusResponse> apiStatusAll(String apiName, Pageable pageable) {
        return apiRepository.findAllByTitleContainingIgnoreCaseOrderByUpdatedAtDesc(apiName, pageable).map(ApiStatusResponse::new);
    }

    public Page<ApiStatusResponse> apiStatusAll(ApiStatus apiStatus, String apiName, Pageable pageable) {
        return apiRepository.findAllByApiStatusAndTitleContainingIgnoreCaseOrderByUpdatedAtDesc(apiStatus, apiName, pageable).map(ApiStatusResponse::new);
    }

}
