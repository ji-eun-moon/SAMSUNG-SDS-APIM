package com.lego.apiservice.using.repository;

import com.lego.apiservice.using.entity.domain.UseCheck;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UseCheckRepository extends JpaRepository<UseCheck, Long> {

    @Query("select u " +
            "from UseCheck u " +
            "where u.teamName = :teamName")
    List<UseCheck> findAllByTeamName(@Param("teamName") String teamName);
}
