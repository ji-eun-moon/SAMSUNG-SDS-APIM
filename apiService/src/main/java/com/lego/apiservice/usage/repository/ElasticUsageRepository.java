package com.lego.apiservice.usage.repository;

import com.lego.apiservice.usage.entity.domain.ElasticUsage;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ElasticUsageRepository extends ElasticsearchRepository<ElasticUsage, String>, CrudRepository<ElasticUsage, String> {

    List<ElasticUsage> findAllByEndpointAndCreatedAtGreaterThanEqualAndCreatedAtLessThan(String endpoint, LocalDateTime startDate, LocalDateTime endDate);

    List<ElasticUsage> findAllByTeamNameAndEndpointAndCreatedAtGreaterThanEqualAndCreatedAtLessThan(String teamName, String endpoint, LocalDateTime startDate, LocalDateTime endDate);

    List<ElasticUsage> findAllByCategoryIdAndCreatedAtGreaterThanEqualAndCreatedAtLessThan(Long CategoryId, LocalDateTime startDate, LocalDateTime endDate);

    List<ElasticUsage> findAllByTeamNameAndCategoryIdAndCreatedAtGreaterThanEqualAndCreatedAtLessThan(String teamName, Long CategoryId, LocalDateTime startDate, LocalDateTime endDate);

}
