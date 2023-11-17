package com.lego.secondsubmit.repository;

import com.lego.secondsubmit.entity.WorkerShift;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface WorkerShiftRepository extends JpaRepository<WorkerShift, Long> {

    @Query("select w " +
            "from WorkerShift w " +
            "where w.worker.workerId=:id and w.workingDay=:date")
    Optional<WorkerShift> findByWorkerIdAndWorkingDay(@Param("id")Long id, @Param("date")LocalDate date);

    @Query("select w " +
            "from WorkerShift w " +
            "where w.worker.workerId=:workerId")
    List<WorkerShift> findAllByWorkerId(@Param("workerId") Long workerId, Pageable pageable);
}
