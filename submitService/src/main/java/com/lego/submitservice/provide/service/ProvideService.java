package com.lego.submitservice.provide.service;

import com.lego.submitservice.client.api.ApiServiceClient;
import com.lego.submitservice.client.api.dto.CreateServerRequest;
import com.lego.submitservice.client.exception.FeignErrorDecoder;
import com.lego.submitservice.client.member.MemberService;
import com.lego.submitservice.client.member.MemberServiceClient;
import com.lego.submitservice.client.member.dto.EmployeeSearchResponse;
import com.lego.submitservice.provide.entity.domain.ApplyType;
import com.lego.submitservice.provide.entity.domain.Provide;
import com.lego.submitservice.provide.entity.domain.State;
import com.lego.submitservice.provide.entity.dto.request.AcceptRequest;
import com.lego.submitservice.provide.entity.dto.request.CreateProvideRequest;
import com.lego.submitservice.provide.entity.dto.response.ProvideDetailResponse;
import com.lego.submitservice.provide.entity.dto.response.ProvideIdResponse;
import com.lego.submitservice.provide.entity.dto.response.ProvideListResponse;
import com.lego.submitservice.provide.repository.ProvideRepository;
import feign.FeignException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProvideService {

    private final MemberServiceClient memberServiceClient;
    private final MemberService memberService;
    private final ApiServiceClient apiServiceClient;
    private final ProvideRepository provideRepository;

    @Transactional
    public void register(String employeeId, CreateProvideRequest createProvideRequest) {
        // 해당 회원이 팀인지 확인하는 로직
        if (!memberService.checkTeam(employeeId, createProvideRequest.getTeamName())) {
            throw new RuntimeException("본인의 팀이 아닙니다.");
        }

        Map<String, String> params = new HashMap<>();
        params.put("employeeId", employeeId);
        EmployeeSearchResponse employeeSearchResponse = memberServiceClient.getMemberByEmployeeId(params);

        provideRepository.save(Provide.builder()
                        .serverName(createProvideRequest.getServerName())
                        .description(createProvideRequest.getDescription())
                        .endpoint(createProvideRequest.getEndpoint())
                        .teamName(createProvideRequest.getTeamName())
                        .employeeId(employeeId)
                        .providerName(employeeSearchResponse.getName())
                        .state(State.대기)
                        .applyType(ApplyType.신규)

                        .createdAt(LocalDateTime.now())
                .build());
    }

    public Page<ProvideListResponse> findAll(Pageable pageable) {
        Page<Provide> provides = provideRepository.findAllByOrderByCreatedAtDesc(pageable);

        provides.getPageable().getPageNumber();
        return provides.map(ProvideListResponse::new);
    }

    public Page<ProvideListResponse> findAllByState(Pageable pageable, State state) {
        Page<Provide> provides = provideRepository.findAllByStateOrderByCreatedAtDesc(state, pageable);

        provides.getPageable().getPageNumber();
        return provides.map(ProvideListResponse::new);
    }

    @Transactional
    public void acceptState(String employeeId, AcceptRequest acceptRequest) {

        log.info(employeeId + " : 사번");

        // 회원이 관리자임을 확인하는 로직
        memberService.checkAuthority(employeeId);

        Provide provide = provideRepository.findById(acceptRequest.getProvideId()).orElseThrow();
        try {
            apiServiceClient.register(new CreateServerRequest(provide.getServerName(), provide.getDescription(), provide.getEndpoint(),
                    acceptRequest.getEndpoint(), provide.getEmployeeId(), provide.getTeamName()));
            provide.changeState(State.승인);
            provide.setModifiedAt();
            provide.setDenyReason(null);
            provideRepository.save(provide);
        } catch (Exception e){
            provide.changeState(State.거절);
            provide.setDenyReason("테스트가 실패 했습니다.");
            provide.setModifiedAt();
            provideRepository.save(provide);
        }

    }

    @Transactional
    public void denyState(String employeeId, Long provideId, String denyReason) {
        // 회원이 관리자임을 확인하는 로직
        memberService.checkAuthority(employeeId);
        Provide provide = provideRepository.findById(provideId).orElseThrow();
        provide.changeState(State.거절);
        provide.setDenyReason(denyReason);
        provide.setModifiedAt();
        provideRepository.save(provide);
    }

    public Page<ProvideListResponse> findAllByTeam(Pageable pageable, String teamName) {
        Page<Provide> provides = provideRepository.findAllByTeamNameOrderByCreatedAtDesc(teamName, pageable);

        provides.getPageable().getPageNumber();
        return provides.map(ProvideListResponse::new);
    }

    public Page<ProvideListResponse> findAllByTeamAndState(Pageable pageable, String teamName, State state) {
        Page<Provide> provides = provideRepository.findAllByTeamNameAndStateOrderByCreatedAtDesc(teamName, state, pageable);

        provides.getPageable().getPageNumber();
        return provides.map(ProvideListResponse::new);
    }


    public ProvideDetailResponse findDetailByProvideId(Long provideId) {
        return new ProvideDetailResponse(provideRepository.findById(provideId).orElseThrow());
    }



    @Transactional
    public void deleteAll() {
        provideRepository.deleteAll();
    }

    public List<ProvideIdResponse> findAllIds() {
        return provideRepository.findAll().stream().map(ProvideIdResponse::new).collect(Collectors.toList());
    }

    public List<Long> findAllIdsToLong() {
        return provideRepository.findAll().stream().map(Provide::getId).collect(Collectors.toList());
    }
}
