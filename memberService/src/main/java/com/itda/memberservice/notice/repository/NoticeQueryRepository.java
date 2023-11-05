package com.itda.memberservice.notice.repository;

import com.itda.memberservice.notice.dto.response.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface NoticeQueryRepository {

    // 읽지 않은 메시지 갯수 조회
    long unreadNoticeCount(String employeeId);

    // 읽지 않은 메시지 조회
    Page<ReceiveUnReadNoticeResponse> receiveUnReadNoticeList(String employeeId, Pageable pageable);

    // 읽은 메시지 조회
    Page<ReceiveReadNoticeResponse> receiveReadNoticeList(String employeeId, Pageable pageable);

    Page<ReceiveNoticeListResponse> receiveAll(String employeeId, Pageable pageable);

    ReceiveNoticeDetailResponse receiveDetail(String employeeId, Long noticeId);

    Page<SendUnReadNoticeResponse> sendUnReadNoticeList(String employeeId, Pageable pageable);

    Page<SendReadNoticeResponse> sendReadNoticeList(String employeeId, Pageable pageable);

    Page<SendNoticeListResponse> sendAll(String employeeId, Pageable pageable);

    SendNoticeDetailResponse sendDetail(String employeeId, Long noticeId);
}
