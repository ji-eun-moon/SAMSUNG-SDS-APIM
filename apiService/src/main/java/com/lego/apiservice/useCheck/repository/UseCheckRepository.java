package com.lego.apiservice.useCheck.repository;

import com.lego.apiservice.useCheck.entity.domain.UseCheck;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UseCheckRepository extends JpaRepository<UseCheck, Long> {

    @Query("select u " +
            "from UseCheck u " +
            "where u.teamName = :teamName")
    List<UseCheck> findAllByTeamName(@Param("teamName") String teamName);

    @Query("select u " +
            "from UseCheck u " +
            "where u.teamName = :teamName and u.category.id = :categoryId")
    Optional<UseCheck> findByTeamNameAndCategory(@Param("teamName") String teamName, @Param("categoryId") Long categoryId);
}
