package com.itda.memberservice.notice.dto.request;

import lombok.*;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class NoticeCreateRequest {

    private List<Long> memberIds;
    private String title;
    private String content;



}
