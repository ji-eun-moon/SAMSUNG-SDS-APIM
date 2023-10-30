package com.lego.submitservice.use.service;

import com.lego.submitservice.client.api.ApiServiceClient;
import com.lego.submitservice.client.member.MemberServiceClient;
import com.lego.submitservice.client.member.dto.SkipMemberResponse;
import com.lego.submitservice.provide.entity.domain.State;
import com.lego.submitservice.use.entity.domain.Use;
import com.lego.submitservice.use.entity.dto.request.CreateUseRequest;
import com.lego.submitservice.use.repository.UseRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UseService {

    private final ApiServiceClient apiServiceClient;
    private final MemberServiceClient memberServiceClient;
    private final UseRepository useRepository;

    public void register(CreateUseRequest createUseRequest, String employeeId) {
        Map<String, String> params = new HashMap<>();
        params.put("employeeId", employeeId);
        SkipMemberResponse skipMemberResponse = memberServiceClient.getMemberByEmployeeId(params);
        useRepository.save(Use.builder()
                        .categoryId(createUseRequest.getCategoryId())
                        .description(createUseRequest.getContent())
                        .teamName(createUseRequest.getTeamName())
                        .userName(skipMemberResponse.getName())
                        .createdAt(LocalDateTime.now())
                        .state(State.대기)
                .build());
    }
}
