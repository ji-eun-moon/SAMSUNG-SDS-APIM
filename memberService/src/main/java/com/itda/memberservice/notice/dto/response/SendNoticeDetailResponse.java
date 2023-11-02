package com.itda.memberservice.notice.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SendNoticeDetailResponse {

    private Long receiverId;
    private String receiverName;
    private String receiverDepartment;
    private String receiverPosition;
    private String receiverImage;
    private String title;
    private String content;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;

}
