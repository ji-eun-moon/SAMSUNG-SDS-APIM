package com.lego.submitservice.use.entity.dto.response;

import com.lego.submitservice.provide.entity.domain.State;
import com.lego.submitservice.use.entity.domain.UseApply;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UseApplyListResponse {

    private Long useApplyId;
    private String categoryName;
    private String teamName;
    private String userName;
    private LocalDateTime createdAt;
    private State state;

    public UseApplyListResponse(UseApply useApply) {
        this.useApplyId = useApply.getId();
        this.categoryName = useApply.getCategoryName();
        this.teamName = useApply.getTeamName();
        this.userName = useApply.getUserName();
        this.createdAt = useApply.getCreatedAt();
        this.state = useApply.getState();

    }
}
