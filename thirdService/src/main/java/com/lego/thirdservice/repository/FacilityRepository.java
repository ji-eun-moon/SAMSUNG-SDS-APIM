package com.lego.thirdservice.repository;


import com.lego.thirdservice.entity.Facility;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FacilityRepository extends JpaRepository<Facility, Long> {

    List<Facility> findAllByFacilityType(String type, Pageable pageable);

    List<Facility> findAllByFacilityNameContains(String name, Pageable pageable);
}
