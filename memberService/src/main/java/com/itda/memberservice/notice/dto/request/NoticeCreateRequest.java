package com.itda.memberservice.notice.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NoticeCreateRequest {

    private List<Long> memberIds;
    private String title;
    private String content;



}
