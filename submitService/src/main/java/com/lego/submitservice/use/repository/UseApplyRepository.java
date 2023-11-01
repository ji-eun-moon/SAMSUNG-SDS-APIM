package com.lego.submitservice.use.repository;


import com.lego.submitservice.use.entity.domain.UseApply;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UseApplyRepository extends JpaRepository<UseApply, Long> {
    Page<UseApply> findAllBy(Pageable pageable);
    Page<UseApply> findAllByTeamName(String TeamName, Pageable pageable);
}
