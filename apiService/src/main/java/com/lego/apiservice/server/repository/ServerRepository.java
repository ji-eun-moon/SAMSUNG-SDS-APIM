package com.lego.apiservice.server.repository;

import com.lego.apiservice.server.entity.Server;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServerRepository extends JpaRepository<Server, Long> {
}
