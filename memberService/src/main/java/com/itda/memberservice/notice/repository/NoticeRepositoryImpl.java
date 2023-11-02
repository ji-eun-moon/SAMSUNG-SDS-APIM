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
                        member.memberId,
                        member.imageUrl.as("senderImage"),
                        member.name.as("senderName")
                        ))
                .from(notice)
                .join(notice.sender, member)
                .where(notice.isRead.eq(false)
                        .and(notice.receiver.employeeId.eq(employeeId))
                        .and(notice.isReceiverDeleted.eq(false)))
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
                        member.memberId,
                        member.imageUrl.as("senderImage"),
                        member.name.as("senderName")
                ))
                .from(notice)
                .join(notice.sender, member)
                .where(notice.isRead.eq(false)
                        .and(notice.receiver.employeeId.eq(employeeId))
                        .and(notice.isReceiverDeleted.eq(false)))
                .fetch();

    }

    @Override
    public List<ReceiveNoticeListResponse> receiveAll(String employeeId) {

        return queryFactory
                .select(
                        Projections.fields(ReceiveNoticeListResponse.class,
                                notice.noticeId,
                                member.memberId,
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
                .fetch();

    }

    @Override
    public ReceiveNoticeDetailResponse detail(String employeeId, Long noticeId) {

        return queryFactory
                .select(
                        Projections.fields(ReceiveNoticeDetailResponse.class,
                                member.memberId,
                                member.name.as("memberName"),
                                member.department.as("memberDepartment"),
                                member.position.as("memberPosition"),
                                member.imageUrl.as("memberImage"),
                                notice.title,
                                notice.content,
                                notice.createdAt))
                .from(notice)
                .leftJoin(notice.sender, member)
                .where(
                        notice.noticeId.eq(noticeId)
                                .and(notice.receiver.employeeId.eq(employeeId))
                )
                .fetchOne();

    }

}
