package com.lego.apiservice.usage.repository;

import com.lego.apiservice.usage.entity.domain.Usage;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UsageRepository extends MongoRepository<Usage, Long> {
}
