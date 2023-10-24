package com.lego.submitservice.provide.entity.dto.response;

import com.lego.submitservice.provide.entity.domain.ApplyType;
import com.lego.submitservice.provide.entity.domain.State;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProvideDetailResponse {

    private Long provideId;
    private String ServerName;
    private String description;
    private String teamName;
    private String providerName;
    private LocalDateTime createdAt;
    private State state;
    private ApplyType applyType;
    private String failReason;
    private String ApiDocs;
}
