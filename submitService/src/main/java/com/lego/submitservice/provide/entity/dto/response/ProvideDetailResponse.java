package com.lego.submitservice.provide.entity.dto.response;

import com.lego.submitservice.provide.entity.domain.ApplyType;
import com.lego.submitservice.provide.entity.domain.Provide;
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
    private String serverName;
    private String description;
    private String teamName;
    private String providerName;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private State state;
    private ApplyType applyType;
    private String denyReason;
    private String apiDocs;

    public ProvideDetailResponse(Provide provide) {
        this.provideId = provide.getId();
        this.serverName = provide.getServerName();
        this.description = provide.getDescription();
        this.teamName = provide.getTeamName();
        this.createdAt = provide.getCreatedAt();
        this.state = provide.getState();
        this.applyType = provide.getApplyType();
        this.modifiedAt = provide.getModifiedAt();
        this.denyReason = provide.getDenyReason();
        this.apiDocs = provide.getEndpoint() + "/swagger-ui/index.html";
        this.providerName = provide.getProviderName();
    }

}
