package com.itda.memberservice.notice.service;

import com.itda.memberservice.member.entity.Member;
import com.itda.memberservice.member.repository.MemberRepository;
import com.itda.memberservice.notice.dto.request.NoticeCreateRequest;
import com.itda.memberservice.notice.dto.request.NoticeListRequest;
import com.itda.memberservice.notice.dto.response.*;
import com.itda.memberservice.notice.entity.Notice;
import com.itda.memberservice.notice.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.webjars.NotFoundException;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final MemberRepository memberRepository;

    @Transactional(readOnly = true)
    public long unreadNoticeCount(String employeeId) {

        return noticeRepository.unreadNoticeCount(employeeId);

    }

    @Transactional(readOnly = true)
    public Page<ReceiveUnReadNoticeResponse> receiveUnReadNoticeList(String employeeId, Pageable pageable) {

        return noticeRepository.receiveUnReadNoticeList(employeeId, pageable);

    }

    @Transactional(readOnly = true)
    public Page<ReceiveReadNoticeResponse> receiveReadNoticeList(String employeeId, Pageable pageable) {

        return noticeRepository.receiveReadNoticeList(employeeId, pageable);

    }

    @Transactional(readOnly = true)
    public Page<ReceiveNoticeListResponse> receiveAll(String employeeId, Pageable pageable) {

        return noticeRepository.receiveAll(employeeId, pageable);

    }

    public void sendNotice(String employeeId, NoticeCreateRequest request) {

        Member sender = memberRepository.findByEmployeeId(employeeId)
                                    .orElseThrow(() -> new NotFoundException("회원이 존재하지 않습니다."));

        log.info("sender = " + sender.toString());

        for (Long memberId : request.getMemberIds()) {

            Member receiver = memberRepository.findById(memberId)
                                    .orElseThrow(() -> new NotFoundException("회원이 존재하지 않습니다."));

            log.info("receiver = " + receiver.toString());

            noticeRepository.save(Notice.builder()
                            .sender(sender)
                            .receiver(receiver)
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

    @Transactional(readOnly = true)
    public Page<SendUnReadNoticeResponse> sendUnReadNoticeList(String employeeId, Pageable pageable) {

        return noticeRepository.sendUnReadNoticeList(employeeId, pageable);

    }

    @Transactional(readOnly = true)
    public Page<SendReadNoticeResponse> sendReadNoticeList(String employeeId, Pageable pageable) {

        return noticeRepository.sendReadNoticeList(employeeId, pageable);

    }

    @Transactional(readOnly = true)
    public Page<SendNoticeListResponse> sendAll(String employeeId, Pageable pageable) {

        return noticeRepository.sendAll(employeeId, pageable);

    }

    @Transactional(readOnly = true)
    public SendNoticeDetailResponse sendDetail(String employeeId, Long noticeId) {

        SendNoticeDetailResponse response = noticeRepository.sendDetail(employeeId, noticeId);

        if(response == null) {
            throw new NotFoundException("해당하는 쪽지는 존재하지 않습니다.");
        }

        return response;

    }

    public void receiveDelete(NoticeListRequest request) {

        for (Long i : request.getList()) {
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

    public void receiveReadAll(NoticeListRequest request) {

        for (Long i : request.getList()) {
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

    public void sendDelete(NoticeListRequest request) {

        for (Long i : request.getList()) {
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
