package com.itda.memberservice.notice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class NoticeDetailResponse {

    private Long memberId;
    private String memberName;
    private String memberDepartment;
    private String memberPosition;
    private String memberImage;
    private String title;
    private String content;
    private String createdAt;

}
