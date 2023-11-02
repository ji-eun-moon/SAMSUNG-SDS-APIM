package com.lego.submitservice.use.service;

import com.lego.submitservice.client.api.ApiServiceClient;
import com.lego.submitservice.client.api.dto.UseCheckRequest;
import com.lego.submitservice.client.member.MemberService;
import com.lego.submitservice.client.member.MemberServiceClient;
import com.lego.submitservice.client.member.dto.EmployeeSearchResponse;
import com.lego.submitservice.client.member.dto.SkipMemberResponse;
import com.lego.submitservice.provide.entity.domain.State;
import com.lego.submitservice.provide.entity.dto.response.DenyResponse;
import com.lego.submitservice.use.entity.domain.UseApply;
import com.lego.submitservice.use.entity.dto.request.CreateUseApplyRequest;
import com.lego.submitservice.use.entity.dto.response.UseApplyDetailResponse;
import com.lego.submitservice.use.entity.dto.response.UseApplyListResponse;
import com.lego.submitservice.use.repository.UseApplyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UseApplyService {

    private final ApiServiceClient apiServiceClient;
    private final MemberServiceClient memberServiceClient;
    private final UseApplyRepository useApplyRepository;
    private final MemberService memberService;

    @Transactional
    public void register(CreateUseApplyRequest createUseRequest, String employeeId) {
        // 해당 회원이 팀인지 확인하는 로직
        if (!memberService.checkTeam(employeeId, createUseRequest.getTeamName())) {
            throw new RuntimeException("본인의 팀이 아닙니다.");
        }

        Map<String, String> apiParams = new HashMap<>();
        apiParams.put("categoryId", String.valueOf(createUseRequest.getCategoryId()));

        EmployeeSearchResponse employeeSearchResponse = memberService.getMemberByEmployeeId(employeeId);
        log.info(employeeSearchResponse.getName());
        useApplyRepository.save(UseApply.builder()
                        .categoryId(createUseRequest.getCategoryId())
                        .categoryName(apiServiceClient.categoryNameToId(apiParams))
                        .description(createUseRequest.getContent())
                        .teamName(createUseRequest.getTeamName())
                        .userName(employeeSearchResponse.getName())
                        .createdAt(LocalDateTime.now())
                        .state(State.대기)
                .build());
    }

    public Page<UseApplyListResponse> findAll(Pageable pageable) {
        return useApplyRepository.findAllBy(pageable).map(UseApplyListResponse::new);
    }

    public Page<UseApplyListResponse> findAllByTeam(String teamName, Pageable pageable) {
        return useApplyRepository.findAllByTeamName(teamName, pageable).map(UseApplyListResponse::new);
    }

    @Transactional
    public void acceptState(Long id, String employeeId) {
        memberService.checkAuthority(employeeId);

        UseApply useApply = useApplyRepository.findById(id).orElseThrow();

        apiServiceClient.useCheckRegister(new UseCheckRequest(useApply.getCategoryId(), useApply.getTeamName()));
        useApply.changeState(State.승인);
        useApply.setModifiedAt();
        useApply.setDenyReason(null);
        useApplyRepository.save(useApply);
    }

    @Transactional
    public void denyState(DenyResponse denyResponse, String employeeId) {
        memberService.checkAuthority(employeeId);

        UseApply useApply = useApplyRepository.findById(denyResponse.getId()).orElseThrow();
        useApply.changeState(State.거절);
        useApply.setModifiedAt();
        useApply.setDenyReason(denyResponse.getDenyReason());
        useApplyRepository.save(useApply);
    }

    public UseApplyDetailResponse findByUseApplyId(Long id) {
        return new UseApplyDetailResponse(useApplyRepository.findById(id).orElseThrow());
    }

}
