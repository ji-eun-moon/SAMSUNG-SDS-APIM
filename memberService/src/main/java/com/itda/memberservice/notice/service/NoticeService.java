package com.itda.memberservice.notice.service;

import com.itda.memberservice.member.repository.MemberRepository;
import com.itda.memberservice.notice.dto.request.NoticeCreateRequest;
import com.itda.memberservice.notice.dto.response.ReceiveNoticeDetailResponse;
import com.itda.memberservice.notice.dto.response.ReceiveNoticeListResponse;
import com.itda.memberservice.notice.dto.response.ReceiveReadNoticeResponse;
import com.itda.memberservice.notice.dto.response.ReceiveUnReadNoticeResponse;
import com.itda.memberservice.notice.entity.Notice;
import com.itda.memberservice.notice.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final MemberRepository memberRepository;

    public long unreadNoticeCount(String employeeId) {

        return noticeRepository.unreadNoticeCount(employeeId);

    }

    public List<ReceiveUnReadNoticeResponse> unreadNoticeList(String employeeId) {

        return noticeRepository.unreadNoticeList(employeeId);

    }

    public List<ReceiveReadNoticeResponse> readNoticeList(String employeeId) {

        return noticeRepository.readNoticeList(employeeId);

    }

    public List<ReceiveNoticeListResponse> receiveAll(String employeeId) {

        return noticeRepository.receiveAll(employeeId);

    }

    public void sendNotice(String employeeId, NoticeCreateRequest request) {

        for (Long memberId : request.getMemberIds()) {

            noticeRepository.save(Notice.builder()
                            .sender(memberRepository.findByEmployeeId(employeeId)
                                    .orElseThrow(() -> new NotFoundException("회원이 존재하지 않습니다.")))
                            .receiver(memberRepository.findById(memberId)
                                    .orElseThrow(() -> new NotFoundException("회원이 존재하지 않습니다.")))
                            .title(request.getTitle())
                            .content(request.getContent())
                            .isRead(false)
                            .isSenderDeleted(false)
                            .isReceiverDeleted(false)
                    .build());

        }

    }

    public ReceiveNoticeDetailResponse detail(String employeeId, Long noticeId) {

        changeReadNotice(employeeId, noticeId);

        return noticeRepository.detail(employeeId, noticeId);

    }

    public void changeReadNotice(String employeeId, Long noticeId) {

        Notice notice = noticeRepository.findById(noticeId)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 쪽지입니다."));

        if (!notice.getReceiver().getEmployeeId().equals(employeeId)) {
            throw new IllegalArgumentException("조회할 수 없는 쪽지입니다.");
        }

        if (!notice.isRead()) {

            noticeRepository.save(Notice.builder()
                    .noticeId(notice.getNoticeId())
                    .title(notice.getTitle())
                    .content(notice.getContent())
                    .isRead(true)
                    .sender(notice.getSender())
                    .receiver(notice.getReceiver())
                    .isSenderDeleted(notice.isSenderDeleted())
                    .isReceiverDeleted(notice.isReceiverDeleted())
                    .createdAt(notice.getCreatedAt())
                    .build());

        }



    }
}
