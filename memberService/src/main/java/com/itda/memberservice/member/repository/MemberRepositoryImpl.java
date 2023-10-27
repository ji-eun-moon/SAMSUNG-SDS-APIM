package com.itda.memberservice.member.repository;

import com.itda.memberservice.member.dto.response.MemberResponse;
import com.itda.memberservice.member.dto.response.SearchMemberResponse;
import com.itda.memberservice.member.entity.Member;
import com.itda.memberservice.team.dto.response.TeamResponse;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;

import java.util.List;

import static com.itda.memberservice.member.entity.QMember.member;
import static com.itda.memberservice.memberteam.entity.QMemberTeam.memberTeam;
import static com.itda.memberservice.team.entity.QTeam.team;

public class MemberRepositoryImpl implements MemberQueryRepository {

    private final JPAQueryFactory queryFactory;

    public MemberRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public void deleteByMemberId(Long memberId) {

        queryFactory
                .delete(member)
                .where(member.memberId.eq(memberId));

    }

    @Override
    public Member findMemberByEmployeeId(String employeeId) {

        return queryFactory
                .select(member)
                .from(member)
                .where(member.employeeId.eq(employeeId))
                .fetchOne();

    }

    @Override
    public List<SearchMemberResponse> findByName(String name) {
        return queryFactory
                .select(Projections.fields(SearchMemberResponse.class,
                        member.employeeId,
                        member.name,
                        member.department,
                        member.position,
                        member.imageUrl))
                .where(member.name.eq(name))
                .from(member)
                .fetch();
    }

    @Override
    public List<MemberResponse> findMemberResponse() {
        List<MemberResponse> results = queryFactory
                .select(Projections.fields(MemberResponse.class,
                        member.memberId,
                        member.employeeId,
                        member.name,
                        member.imageUrl,
                        member.authority,
                        member.department,
                        member.position,
                        member.email,
                        member.memberTeamList
                ))
                .from(member)
                .fetch();

        for (MemberResponse result : results) {

            long memberId = result.getMemberId();

            List<TeamResponse> teamResponses = queryFactory
                    .select(Projections.fields(TeamResponse.class,
                            team.name))
                    .from(team)
                    .where((JPAExpressions.select(memberTeam.team)
                            .from(memberTeam)
                            .where(memberTeam.member.memberId.eq(memberId))).contains(team))
                    .fetch();

            result.setTeams(teamResponses);

        }

        return results;

    }
}
