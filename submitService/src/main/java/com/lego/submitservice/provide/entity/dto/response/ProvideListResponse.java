package com.lego.submitservice.provide.entity.dto.response;

import com.lego.submitservice.provide.entity.domain.ApplyType;
import com.lego.submitservice.provide.entity.domain.State;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProvideListResponse {

    private Long provideId;
    private String serverName;
    private String teamName;
    private String providerName;
    private LocalDateTime createdAt;
    private State state;
    private ApplyType applyType;
}
