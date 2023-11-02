package com.itda.memberservice.notice.service;

import com.itda.memberservice.notice.dto.response.NoticeListResponse;
import com.itda.memberservice.notice.dto.response.ReadNoticeResponse;
import com.itda.memberservice.notice.dto.response.UnReadNoticeResponse;
import com.itda.memberservice.notice.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;

    public long unreadNoticeCount(String employeeId) {

        return noticeRepository.unreadNoticeCount(employeeId);

    }

    public List<UnReadNoticeResponse> unreadNoticeList(String employeeId) {

        return noticeRepository.unreadNoticeList(employeeId);

    }

    public List<ReadNoticeResponse> readNoticeList(String employeeId) {

        return noticeRepository.readNoticeList(employeeId);

    }

    public List<NoticeListResponse> receiveAll(String employeeId) {

        return noticeRepository.receiveAll(employeeId);

    }
}
