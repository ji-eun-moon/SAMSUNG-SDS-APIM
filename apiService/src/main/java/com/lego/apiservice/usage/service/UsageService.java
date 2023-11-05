package com.lego.apiservice.usage.service;

import com.lego.apiservice.usage.entity.domain.Usage;
import com.lego.apiservice.usage.entity.dto.request.CreateUsageRequest;
import com.lego.apiservice.usage.entity.dto.response.UsageResponse;
import com.lego.apiservice.usage.increase.service.AutoIncreaseService;
import com.lego.apiservice.usage.repository.UsageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UsageService {

    private final UsageRepository usageRepository;
    private final AutoIncreaseService autoIncreaseService;

    @Transactional
    public void register(CreateUsageRequest createUsageRequest) {
        Usage usage = Usage.builder()
                ._id(autoIncreaseService.generateSequence(Usage.USAGE_SEQUENCE))
                .createAt(createUsageRequest.getCreateAt())
                .method(createUsageRequest.getMethod())
                .endpoint(createUsageRequest.getEndpoint())
                .teamToken(createUsageRequest.getTeamToken())
                .categoryId(createUsageRequest.getCategoryId())
                .responseTime(createUsageRequest.getResponseTime())
                .responseCode(createUsageRequest.getResponseCode())
                .build();
        usageRepository.save(usage);
    }

    public List<UsageResponse> findAll() {
        return usageRepository.findAll().stream().map(UsageResponse::new).collect(Collectors.toList());
    }

    @Transactional
    public void deleteAll() {
        usageRepository.deleteAll();
    }
}
