package com.lego.apiservice.usage.repository;

import com.lego.apiservice.usage.entity.domain.Usage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UsageRepository extends JpaRepository<Usage, Long> {

    @Query("select u " +
            "from Usage u " +
            "where u.teamName = :teamName")
    List<Usage> findAllByTeamName(@Param("teamName") String teamName);
}
