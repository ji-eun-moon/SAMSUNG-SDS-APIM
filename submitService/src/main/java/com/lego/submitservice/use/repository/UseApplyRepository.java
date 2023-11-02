package com.lego.submitservice.use.repository;


import com.lego.submitservice.provide.entity.domain.Provide;
import com.lego.submitservice.provide.entity.domain.State;
import com.lego.submitservice.use.entity.domain.UseApply;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UseApplyRepository extends JpaRepository<UseApply, Long> {
    Page<UseApply> findAllByOrderByCreatedAtDesc(Pageable pageable);
    Page<UseApply> findAllByStateOrderByCreatedAtDesc(State state, Pageable pageable);

    Page<UseApply> findAllByTeamNameOrderByCreatedAtDesc(String teamName, Pageable pageable);
    Page<UseApply> findAllByTeamNameAndStateOrderByCreatedAtDesc(String teamName, State state, Pageable pageable);
}
