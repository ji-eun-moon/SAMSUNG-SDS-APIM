package com.lego.thirdservice.service;

import com.lego.thirdservice.dto.Availability;
import com.lego.thirdservice.dto.ReservationPerson;
import com.lego.thirdservice.dto.ReservationReq;
import com.lego.thirdservice.entity.Facility;
import com.lego.thirdservice.entity.FacilityReq;
import com.lego.thirdservice.entity.Reservation;
import com.lego.thirdservice.repository.FacilityRepository;
import com.lego.thirdservice.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FacilityService {

    private final FacilityRepository facilityRepository;
    private final ReservationRepository reservationRepository;

    @Transactional
    public void register(FacilityReq facility) {
        if (facilityRepository.findById(facility.getFacilityId()).isEmpty()) {
          facilityRepository.save(facility.toFacility());
        }
    }

    @Transactional
    public void reservationRegister(ReservationReq reservationReq) {
        Optional<Facility> facility = facilityRepository.findById(reservationReq.getFacilityId());
        if (facility.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        if (reservationRepository.findByDateAndFacility(reservationReq.getReservationDate(), facility.get()).isEmpty()) {
            reservationRepository.save(Reservation.builder()
                            .date(reservationReq.getReservationDate())
                            .name(reservationReq.getReservationPerson())
                            .facility(facility.get())
                    .build());
        }
    }

    public Facility findById(Long id) {
        if (facilityRepository.findById(id).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        return facilityRepository.findById(id).get();
    }

    public List<Facility> findByType(String type, Pageable pageable) {
        return facilityRepository.findAllByFacilityType(type, pageable);
    }

    public List<Facility> findByName(String Name, Pageable pageable) {
        return facilityRepository.findAllByFacilityNameContains(Name, pageable);
    }

    public Availability reservationAble(Long facilityId, LocalDate date) {
        Optional<Facility> facility = facilityRepository.findById(facilityId);
        if (facility.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        Optional<Reservation> reservation = reservationRepository.findByDateAndFacility(date, facility.get());
        return new Availability(reservation.isEmpty());
    }

    public List<ReservationPerson> findReservationByName(String name, Pageable pageable) {
        return reservationRepository.findAllByName(name, pageable).stream().map(ReservationPerson::new)
                .collect(Collectors.toList());
    }
}
