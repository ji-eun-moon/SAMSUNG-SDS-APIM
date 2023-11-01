package com.lego.submitservice.use.entity.dto.response;

import com.lego.submitservice.provide.entity.domain.State;
import com.lego.submitservice.use.entity.domain.UseApply;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UseApplyDetailResponse {

    private Long useApplyId;
    private String categoryName;
    private String description;
    private String teamName;
    private String userName;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private State state;
    private String failReason;

    public UseApplyDetailResponse(UseApply useApply) {
        this.useApplyId = useApply.getId();
        this.categoryName = useApply.getCategoryName();
        this.description = useApply.getDescription();
        this.teamName = useApply.getTeamName();
        this.userName = useApply.getUserName();
        this.createdAt = useApply.getCreatedAt();
        this.modifiedAt = useApply.getModifiedAt();
        this.state = useApply.getState();
        this.failReason = useApply.getDenyReason();
    }
}
