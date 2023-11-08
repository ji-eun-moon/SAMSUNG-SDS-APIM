package com.itda.memberservice.memberteam.repository;

import com.itda.memberservice.member.entity.Member;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;

import java.util.List;

import static com.itda.memberservice.member.entity.QMember.member;
import static com.itda.memberservice.memberteam.entity.QMemberTeam.memberTeam;

public class MemberTeamRepositoryImpl implements MemberTeamQueryRepository {

    private final JPAQueryFactory queryFactory;

    public MemberTeamRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Boolean check(String employeeId, String teamName) {

        return queryFactory
                .select(memberTeam.count())
                .from(memberTeam)
                .where(memberTeam.member.employeeId.eq(employeeId)
                        .and(memberTeam.team.name.eq(teamName)))
                .fetchFirst() > 0;

    }

    @Override
    public List<Member> findMembersByTeam(String teamName) {

        return queryFactory
                .select(member)
                .from(memberTeam)
                .leftJoin(memberTeam.member, member)
                .where(memberTeam.team.name.eq(teamName))
                .fetch();

    }
}
