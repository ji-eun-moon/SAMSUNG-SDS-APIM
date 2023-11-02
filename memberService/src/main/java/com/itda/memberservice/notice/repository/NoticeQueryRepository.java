package com.itda.memberservice.notice.repository;

import com.itda.memberservice.notice.dto.response.NoticeListResponse;
import com.itda.memberservice.notice.dto.response.ReadNoticeResponse;
import com.itda.memberservice.notice.dto.response.UnReadNoticeResponse;

import java.util.List;

public interface NoticeQueryRepository {

    // 읽지 않은 메시지 갯수 조회
    long unreadNoticeCount(String employeeId);

    // 읽지 않은 메시지 조회
    List<UnReadNoticeResponse> unreadNoticeList(String employeeId);

    // 읽은 메시지 조회
    List<ReadNoticeResponse> readNoticeList(String employeeId);

    List<NoticeListResponse> receiveAll(String employeeId);

}
