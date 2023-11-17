package com.lego.submitservice.provide.repository;


import com.lego.submitservice.provide.entity.domain.Provide;
import com.lego.submitservice.provide.entity.domain.State;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProvideRepository extends JpaRepository<Provide, Long> {
    Page<Provide> findAllByOrderByCreatedAtDesc(Pageable pageable);
    Page<Provide> findAllByStateOrderByCreatedAtDesc(State state, Pageable pageable);

    Page<Provide> findAllByTeamNameOrderByCreatedAtDesc(String teamName, Pageable pageable);
    Page<Provide> findAllByTeamNameAndStateOrderByCreatedAtDesc(String teamName, State state, Pageable pageable);
}
