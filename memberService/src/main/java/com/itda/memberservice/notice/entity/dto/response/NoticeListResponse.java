package com.itda.memberservice.notice.entity.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class NoticeListResponse {

    private Long noticeId;
    private String title;
    private LocalDateTime createAt;
    private boolean check;

    // 작성자 정보
    // 작성자 이름 fromName
    // 작성자 imageUrl fromImageUrl

    private String fromEmployeeId;
    private String fromName;
    private String fromImageUrl;

}
