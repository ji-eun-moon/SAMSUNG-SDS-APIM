package com.example.noticeservice.repository;

import com.example.noticeservice.dto.response.ReceiveUnReadNoticeResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface NoticeQueryRepository {
    Long unreadNoticeCount(Long memberId);

    Page<ReceiveUnReadNoticeResponse> receiveUnReadNoticeList(String employeeId, Pageable pageable);
}
