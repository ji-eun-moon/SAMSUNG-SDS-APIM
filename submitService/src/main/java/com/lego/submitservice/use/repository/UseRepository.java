package com.lego.submitservice.use.repository;


import com.lego.submitservice.use.entity.domain.Use;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UseRepository extends JpaRepository<Use, Long> {
}
