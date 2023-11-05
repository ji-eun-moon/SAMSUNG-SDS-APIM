package com.itda.memberservice.notice.service;

import com.itda.memberservice.member.repository.MemberRepository;
import com.itda.memberservice.notice.dto.request.NoticeCreateRequest;
import com.itda.memberservice.notice.dto.response.*;
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

    public List<ReceiveUnReadNoticeResponse> receiveUnReadNoticeList(String employeeId) {

        return noticeRepository.receiveUnReadNoticeList(employeeId);

    }

    public List<ReceiveReadNoticeResponse> receiveReadNoticeList(String employeeId) {

        return noticeRepository.receiveReadNoticeList(employeeId);

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

    public ReceiveNoticeDetailResponse receiveDetail(String employeeId, Long noticeId) {

        changeReadNotice(employeeId, noticeId);

        return noticeRepository.receiveDetail(employeeId, noticeId);

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

    public List<SendUnReadNoticeResponse> sendUnReadNoticeList(String employeeId) {

        return noticeRepository.sendUnReadNoticeList(employeeId);

    }

    public List<SendReadNoticeResponse> sendReadNoticeList(String employeeId) {

        return noticeRepository.sendReadNoticeList(employeeId);

    }

    public List<SendNoticeListResponse> sendAll(String employeeId) {

        return noticeRepository.sendAll(employeeId);

    }

    public SendNoticeDetailResponse sendDetail(String employeeId, Long noticeId) {

        SendNoticeDetailResponse response = noticeRepository.sendDetail(employeeId, noticeId);

        if(response == null) {
            throw new NotFoundException("해당하는 쪽지는 존재하지 않습니다.");
        }

        return response;

    }

    public void receiveDelete(List<Long> list) {

        for (Long i : list) {
            Notice notice = noticeRepository.findById(i)
                    .orElseThrow(() -> new NotFoundException("해당 쪽지는 존재하지않습니다."));

            if (notice.isSenderDeleted()) {
                noticeRepository.delete(notice);
                continue;
            }

            noticeRepository.save(
                    Notice.builder()
                            .noticeId(notice.getNoticeId())
                            .title(notice.getTitle())
                            .content(notice.getContent())
                            .isRead(notice.isRead())
                            .receiver(notice.getReceiver())
                            .sender(notice.getSender())
                            .isSenderDeleted(notice.isSenderDeleted())
                            .isReceiverDeleted(true)
                            .createdAt(notice.getCreatedAt())
                            .build()
            );

        }

    }

    public void receiveReadAll(List<Long> list) {

        for (Long i : list) {
            Notice notice = noticeRepository.findById(i)
                    .orElseThrow(() -> new NotFoundException("해당 쪽지는 존재하지않습니다."));

            noticeRepository.save(
                    Notice.builder()
                            .noticeId(notice.getNoticeId())
                            .title(notice.getTitle())
                            .content(notice.getContent())
                            .isRead(true)
                            .receiver(notice.getReceiver())
                            .sender(notice.getSender())
                            .isSenderDeleted(notice.isSenderDeleted())
                            .isReceiverDeleted(notice.isReceiverDeleted())
                            .createdAt(notice.getCreatedAt())
                            .build()
            );

        }

    }

    public void sendDelete(List<Long> list) {

        for (Long i : list) {
            Notice notice = noticeRepository.findById(i)
                    .orElseThrow(() -> new NotFoundException("해당 쪽지는 존재하지않습니다."));

            if (notice.isReceiverDeleted()) {
                noticeRepository.delete(notice);
                continue;
            }

            noticeRepository.save(
                    Notice.builder()
                            .noticeId(notice.getNoticeId())
                            .title(notice.getTitle())
                            .content(notice.getContent())
                            .isRead(notice.isRead())
                            .receiver(notice.getReceiver())
                            .sender(notice.getSender())
                            .isSenderDeleted(true)
                            .isReceiverDeleted(notice.isReceiverDeleted())
                            .createdAt(notice.getCreatedAt())
                            .build()
            );

        }

    }
}
