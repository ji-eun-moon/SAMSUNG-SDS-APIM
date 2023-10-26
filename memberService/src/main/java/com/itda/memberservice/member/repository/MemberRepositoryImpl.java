package com.itda.memberservice.member.repository;

import com.itda.memberservice.member.entity.Member;
import com.itda.memberservice.member.entity.QMember;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static com.itda.memberservice.member.entity.QMember.member;

public class MemberRepositoryImpl implements MemberQueryRepository {

    private final JPAQueryFactory queryFactory;

    public MemberRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    public List<Member> findAll(){

        return queryFactory
                .select(member)
                .from(member)
                .fetch();

    }

}
