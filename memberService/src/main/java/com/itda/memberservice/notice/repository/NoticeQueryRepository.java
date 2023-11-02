package com.itda.memberservice.notice.repository;

import com.itda.memberservice.notice.dto.response.ReceiveNoticeDetailResponse;
import com.itda.memberservice.notice.dto.response.ReceiveNoticeListResponse;
import com.itda.memberservice.notice.dto.response.ReceiveReadNoticeResponse;
import com.itda.memberservice.notice.dto.response.ReceiveUnReadNoticeResponse;

import java.util.List;

public interface NoticeQueryRepository {

    // 읽지 않은 메시지 갯수 조회
    long unreadNoticeCount(String employeeId);

    // 읽지 않은 메시지 조회
    List<ReceiveUnReadNoticeResponse> unreadNoticeList(String employeeId);

    // 읽은 메시지 조회
    List<ReceiveReadNoticeResponse> readNoticeList(String employeeId);

    List<ReceiveNoticeListResponse> receiveAll(String employeeId);

    ReceiveNoticeDetailResponse detail(String employeeId, Long noticeId);
}
