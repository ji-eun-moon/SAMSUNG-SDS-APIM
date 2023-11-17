package com.lego.thirdservice.repository;

import com.lego.thirdservice.entity.Facility;
import com.lego.thirdservice.entity.Reservation;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    Optional<Reservation> findByDateAndFacility(LocalDate date, Facility facility);

    List<Reservation> findAllByName(String name, Pageable pageable);
}
