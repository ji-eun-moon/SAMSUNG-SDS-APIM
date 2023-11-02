package com.itda.memberservice.notice.repository;

import com.itda.memberservice.notice.dto.response.ReceiveNoticeDetailResponse;
import com.itda.memberservice.notice.dto.response.ReceiveNoticeListResponse;
import com.itda.memberservice.notice.dto.response.ReceiveReadNoticeResponse;
import com.itda.memberservice.notice.dto.response.ReceiveUnReadNoticeResponse;
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
    public List<ReceiveUnReadNoticeResponse> unreadNoticeList(String employeeId) {

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
    public List<ReceiveReadNoticeResponse> readNoticeList(String employeeId) {

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
    public ReceiveNoticeDetailResponse detail(String employeeId, Long noticeId) {

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
                                notice.createdAt))
                .from(notice)
                .leftJoin(notice.sender, member)
                .where(
                        notice.noticeId.eq(noticeId)
                                .and(notice.receiver.employeeId.eq(employeeId))
                )
                .orderBy(notice.createdAt.desc())
                .fetchOne();

    }

}
