package com.itda.memberservice.notice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReceiveUnReadNoticeResponse {

    private Long noticeId;
    private Long memberId;
    private String senderName;
    private String senderImage;
    private String title;
    private LocalDateTime createdAt;

}
