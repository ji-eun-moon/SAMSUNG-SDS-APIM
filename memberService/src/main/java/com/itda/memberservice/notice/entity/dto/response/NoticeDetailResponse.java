package com.itda.memberservice.notice.entity.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class NoticeDetailResponse {

    private String title;
    private String content;
    private LocalDateTime createdAt;

    // 작성자 정보
    // 작성자 이름 fromName
    // 작성자 imageUrl fromImageUrl
    // 작성자 부서 fromDepartment
    // 작성자 직무 fromPosition

    private String fromEmployeeId;
    private String fromName;
    private String fromImageUrl;
    private String fromDepartment;
    private String fromPosition;
}
