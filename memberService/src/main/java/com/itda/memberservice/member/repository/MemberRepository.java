package com.itda.memberservice.member.repository;

import com.itda.memberservice.member.entity.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
