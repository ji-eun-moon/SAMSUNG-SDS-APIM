package com.itda.memberservice.notice.repository;

import com.itda.memberservice.notice.dto.response.*;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;

import java.util.List;

import static com.itda.memberservice.member.entity.QMember.member;
import static com.itda.memberservice.notice.entity.QNotice.notice;

public class NoticeRepositoryImpl implements NoticeQueryRepository{

    private final JPAQueryFactory queryFactory;

    public NoticeRepositoryImpl(EntityManager em) {
        this.queryFactory =  new JPAQueryFactory(em);
    }

    @Override
    public long unreadNoticeCount(String employeeId) {

        return queryFactory
                .select(notice.count())
                .from(notice)
                .where(
                        notice.receiver.employeeId.eq(employeeId)
                                .and(notice.isRead.eq(false))
                                .and(notice.isReceiverDeleted.eq(false))
                )
                .fetchFirst();

    }

    @Override
    public List<ReceiveUnReadNoticeResponse> receiveUnReadNoticeList(String employeeId) {

        return queryFactory
                .select(Projections.fields(ReceiveUnReadNoticeResponse.class,
                        notice.noticeId,
                        notice.title,
                        notice.createdAt,
                        member.memberId.as("senderId"),
                        member.imageUrl.as("senderImage"),
                        member.name.as("senderName")
                        ))
                .from(notice)
                .join(notice.sender, member)
                .where(notice.isRead.eq(true)
                        .and(notice.receiver.employeeId.eq(employeeId))
                        .and(notice.isReceiverDeleted.eq(false)))
                .orderBy(notice.createdAt.desc())
                .fetch();

    }

    @Override
    public List<ReceiveReadNoticeResponse> receiveReadNoticeList(String employeeId) {

        return queryFactory
                .select(
                        Projections.fields(ReceiveReadNoticeResponse.class,
                        notice.noticeId,
                        notice.title,
                        notice.createdAt,
                        member.memberId.as("senderId"),
                        member.imageUrl.as("senderImage"),
                        member.name.as("senderName")
                ))
                .from(notice)
                .join(notice.sender, member)
                .where(notice.isRead.eq(false)
                        .and(notice.receiver.employeeId.eq(employeeId))
                        .and(notice.isReceiverDeleted.eq(false)))
                .orderBy(notice.createdAt.desc())
                .fetch();

    }

    @Override
    public List<ReceiveNoticeListResponse> receiveAll(String employeeId) {

        return queryFactory
                .select(
                        Projections.fields(ReceiveNoticeListResponse.class,
                                notice.noticeId,
                                member.memberId.as("senderId"),
                                notice.title,
                                member.name.as("senderName"),
                                member.imageUrl.as("senderImage"),
                                notice.createdAt,
                                notice.isRead
                                )
                )
                .from(notice)
                .leftJoin(notice.sender, member)
                .where(notice.receiver.employeeId.eq(employeeId))
                .orderBy(notice.createdAt.desc())
                .fetch();

    }

    @Override
    public ReceiveNoticeDetailResponse receiveDetail(String employeeId, Long noticeId) {

        return queryFactory
                .select(
                        Projections.fields(ReceiveNoticeDetailResponse.class,
                                member.memberId.as("senderId"),
                                member.name.as("senderName"),
                                member.department.as("senderDepartment"),
                                member.position.as("senderPosition"),
                                member.imageUrl.as("senderImage"),
                                notice.title,
                                notice.content,
                                notice.createdAt
                        )
                )
                .from(notice)
                .leftJoin(notice.sender, member)
                .where(
                        notice.noticeId.eq(noticeId)
                                .and(notice.receiver.employeeId.eq(employeeId))
                )
                .orderBy(notice.createdAt.desc())
                .fetchOne();

    }

    @Override
    public List<SendUnReadNoticeResponse> sendUnReadNoticeList(String employeeId) {
        return queryFactory
                .select(
                        Projections.fields(SendUnReadNoticeResponse.class,
                                notice.noticeId,
                                member.memberId.as("receiverId"),
                                member.name.as("receiverName"),
                                member.imageUrl.as("receiverImage"),
                                notice.title.as("title"),
                                notice.createdAt
                        )
                )
                .from(notice)
                .leftJoin(notice.receiver, member)
                .where(notice.sender.employeeId.eq(employeeId))
                .orderBy(notice.createdAt.desc())
                .fetch();
    }

    @Override
    public List<SendReadNoticeResponse> sendReadNoticeList(String employeeId) {

        return queryFactory
                .select(
                        Projections.fields(SendReadNoticeResponse.class,
                                notice.noticeId,
                                member.memberId.as("receiverId"),
                                member.name.as("receiverName"),
                                member.imageUrl.as("receiverImage"),
                                notice.title,
                                notice.createdAt
                        )
                )
                .from(notice)
                .leftJoin(notice.receiver, member)
                .where(notice.sender.employeeId.eq(employeeId))
                .orderBy(notice.createdAt.desc())
                .fetch();

    }

    @Override
    public List<SendNoticeListResponse> sendAll(String employeeId) {

        return queryFactory
                .select(
                        Projections.fields(SendNoticeListResponse.class,
                                notice.noticeId,
                                member.memberId.as("receiverId"),
                                notice.title,
                                member.name.as("receiverName"),
                                member.imageUrl.as("receiverImage"),
                                notice.createdAt,
                                notice.isRead
                                )
                )
                .from(notice)
                .leftJoin(notice.receiver, member)
                .where(notice.sender.employeeId.eq(employeeId))
                .orderBy(notice.createdAt.desc())
                .fetch();

    }

    @Override
    public SendNoticeDetailResponse sendDetail(String employeeId, Long noticeId) {

        return queryFactory
                .select(
                        Projections.fields(SendNoticeDetailResponse.class,
                                member.memberId.as("receiverId"),
                                member.name.as("receiverName"),
                                member.department.as("receiverDepartment"),
                                member.position.as("receiverPosition"),
                                member.imageUrl.as("receiverImage"),
                                notice.title,
                                notice.content,
                                notice.createdAt
                                )
                )
                .from(notice)
                .leftJoin(notice.receiver, member)
                .where(notice.sender.employeeId.eq(employeeId)
                        .and(notice.noticeId.eq(noticeId)))
                .orderBy(notice.createdAt.desc())
                .fetchOne();

    }

}
