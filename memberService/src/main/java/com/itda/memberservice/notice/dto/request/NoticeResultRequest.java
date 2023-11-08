package com.itda.memberservice.notice.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoticeResultRequest {

    private String applyName;
    private String teamName;
    private String applyType;
    private String result;

}
