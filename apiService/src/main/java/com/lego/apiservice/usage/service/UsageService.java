package com.lego.apiservice.usage.service;

import com.lego.apiservice.category.repository.CategoryRepository;
import com.lego.apiservice.usage.entity.domain.Usage;
import com.lego.apiservice.usage.entity.dto.request.UsageRequest;
import com.lego.apiservice.usage.repository.UsageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class UsageService {

    private final UsageRepository usageRepository;
    private final CategoryRepository categoryRepository;

    @Transactional
    public void register(UsageRequest usageRequest) {
        usageRepository.save(Usage.builder()
                        .category(categoryRepository.findById(usageRequest.getCategoryId()).orElseThrow())
                        .teamName(usageRequest.getTeamName())
                .build());
    }
}
