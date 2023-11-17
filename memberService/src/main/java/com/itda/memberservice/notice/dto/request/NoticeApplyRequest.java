package com.itda.memberservice.notice.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NoticeApplyRequest {

    private String applyName;
    private String teamName;
    private String categoryName;

}
