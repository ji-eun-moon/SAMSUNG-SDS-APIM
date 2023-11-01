package com.lego.apiservice.api.repostiory;

import com.lego.apiservice.api.entity.domain.Api;
import com.lego.apiservice.category.entity.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApiRepository extends JpaRepository<Api, Long> {
    List<Api> findAllByCategory(Category category);
}
