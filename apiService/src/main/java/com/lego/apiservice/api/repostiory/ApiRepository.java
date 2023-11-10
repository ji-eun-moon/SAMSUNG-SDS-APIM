package com.lego.apiservice.api.repostiory;

import com.lego.apiservice.api.entity.domain.Api;
import com.lego.apiservice.api.entity.domain.ApiStatus;
import com.lego.apiservice.category.entity.domain.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ApiRepository extends JpaRepository<Api, Long> {
    List<Api> findAllByCategory(Category category);

    @Query("select a " +
            "from Api a " +
            "where a.category.id=:categoryId")
    List<Api> findAllByCategoryId(@Param("categoryId") Long categoryId);

    List<Api> findAllByTitleContainingIgnoreCase(String title);

    Page<Api> findAllByOrderByUpdatedAtDesc(Pageable pageable);

    Page<Api> findAllByApiStatusOrderByUpdatedAtDesc(ApiStatus apiStatus, Pageable pageable);

    Page<Api> findAllByTitleContainingIgnoreCaseOrderByUpdatedAtDesc(String title, Pageable pageable);

    Page<Api> findAllByApiStatusAndTitleContainingIgnoreCaseOrderByUpdatedAtDesc(ApiStatus apiStatus, String title, Pageable pageable);

    List<Api> findAllByApiStatus(ApiStatus apiStatus);

    Optional<Api> findByEndpoint(String endpoint);
}
