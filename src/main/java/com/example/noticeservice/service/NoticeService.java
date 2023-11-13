package com.example.noticeservice.service;

import com.example.noticeservice.dto.response.ReceiveUnReadNoticeResponse;
import com.example.noticeservice.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;

    public Long unreadNoticeCount(Long memberId) {

        return noticeRepository.unreadNoticeCount(memberId);

    }

    public Page<ReceiveUnReadNoticeResponse> receiveUnReadNoticeList(String employeeId, Pageable pageable) {

        return noticeRepository.receiveUnReadNoticeList(employeeId, pageable);

    }
}
