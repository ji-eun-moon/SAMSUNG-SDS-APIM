package com.itda.memberservice.team.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;

public class TeamRepositoryImpl implements TeamQueryRepository{

    private final EntityManager em;
    private final JPAQueryFactory jpaQueryFactory;

    public TeamRepositoryImpl(EntityManager em) {
        this.em = em;
        this.jpaQueryFactory = new JPAQueryFactory(em);
    }
}
