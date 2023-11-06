package com.lego.apiservice.api.repostiory;

import com.lego.apiservice.api.entity.domain.Api;
import com.lego.apiservice.api.entity.domain.ApiStatus;
import com.lego.apiservice.category.entity.domain.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApiRepository extends JpaRepository<Api, Long> {
    List<Api> findAllByCategory(Category category);

    List<Api> findAllByTitleContainingIgnoreCase(String title);

    Page<Api> findAllByOrderByUpdatedAtDesc(Pageable pageable);

    Page<Api> findAllByApiStatusOrderByUpdatedAtDesc(ApiStatus apiStatus, Pageable pageable);

    Page<Api> findAllByTitleContainingIgnoreCaseOrderByUpdatedAtDesc(String title, Pageable pageable);

    Page<Api> findAllByApiStatusAndTitleContainingIgnoreCaseOrderByUpdatedAtDesc(ApiStatus apiStatus, String title, Pageable pageable);

}
