package com.itda.memberservice.notice.repository;

import com.itda.memberservice.notice.dto.response.NoticeListResponse;
import com.itda.memberservice.notice.dto.response.ReadNoticeResponse;
import com.itda.memberservice.notice.dto.response.UnReadNoticeResponse;
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
                )
                .fetchFirst();

    }

    @Override
    public List<UnReadNoticeResponse> unreadNoticeList(String employeeId) {

        return queryFactory
                .select(Projections.fields(UnReadNoticeResponse.class,
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
                        .and(notice.receiver.employeeId.eq(employeeId)))
                .fetch();

    }

    @Override
    public List<ReadNoticeResponse> readNoticeList(String employeeId) {

        return queryFactory
                .select(
                        Projections.fields(ReadNoticeResponse.class,
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
                        .and(notice.receiver.employeeId.eq(employeeId)))
                .fetch();

    }

    @Override
    public List<NoticeListResponse> receiveAll(String employeeId) {

        return queryFactory
                .select(
                        Projections.fields(NoticeListResponse.class,
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

}
