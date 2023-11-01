package com.lego.apiservice.using.service;

import com.lego.apiservice.category.repository.CategoryRepository;
import com.lego.apiservice.using.entity.domain.UseCheck;
import com.lego.apiservice.using.entity.dto.request.UseCheckRequest;
import com.lego.apiservice.using.repository.UseCheckRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class UseCheckService {

    private final UseCheckRepository useCheckRepository;
    private final CategoryRepository categoryRepository;

    @Transactional
    public void register(UseCheckRequest useCheckRequest) {
        useCheckRepository.save(UseCheck.builder()
                        .category(categoryRepository.findById(useCheckRequest.getCategoryId()).orElseThrow())
                        .teamName(useCheckRequest.getTeamName())
                .build());
    }
}
