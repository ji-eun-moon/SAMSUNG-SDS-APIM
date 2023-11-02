package com.itda.memberservice.notice.repository;

import com.itda.memberservice.notice.dto.response.*;

import java.util.List;

public interface NoticeQueryRepository {

    // 읽지 않은 메시지 갯수 조회
    long unreadNoticeCount(String employeeId);

    // 읽지 않은 메시지 조회
    List<ReceiveUnReadNoticeResponse> receiveUnReadNoticeList(String employeeId);

    // 읽은 메시지 조회
    List<ReceiveReadNoticeResponse> receiveReadNoticeList(String employeeId);

    List<ReceiveNoticeListResponse> receiveAll(String employeeId);

    ReceiveNoticeDetailResponse receiveDetail(String employeeId, Long noticeId);

    List<SendUnReadNoticeResponse> sendUnReadNoticeList(String employeeId);

    List<SendReadNoticeResponse> sendReadNoticeList(String employeeId);

    List<SendNoticeListResponse> sendAll(String employeeId);

    SendNoticeDetailResponse sendDetail(String employeeId, Long noticeId);
}
