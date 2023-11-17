package com.lego.secondsubmit.service;

import com.lego.secondsubmit.dto.request.WorkerCreateReq;
import com.lego.secondsubmit.dto.request.WorkerShiftCreateReq;
import com.lego.secondsubmit.dto.response.WorkerRes;
import com.lego.secondsubmit.dto.response.WorkerShiftRes;
import com.lego.secondsubmit.entity.Worker;
import com.lego.secondsubmit.entity.WorkerShift;
import com.lego.secondsubmit.repository.WorkerRepository;
import com.lego.secondsubmit.repository.WorkerShiftRepository;
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

@Transactional(readOnly = true)
@Service
@RequiredArgsConstructor
public class WorkerService {

    private final WorkerRepository workerRepository;
    private final WorkerShiftRepository workerShiftRepository;

    @Transactional
    public void workerRegister(WorkerCreateReq workerCreateReq) {
        if (workerRepository.findById(workerCreateReq.getId()).isEmpty()) {
            workerRepository.save(Worker.builder()
                            .workerId(workerCreateReq.getId())
                            .firstName(workerCreateReq.getFirstName())
                            .lastName(workerCreateReq.getLastName())
                            .birthdate(workerCreateReq.getBirthdate())
                            .hireDate(workerCreateReq.getHireDate())
                            .department(workerCreateReq.getDepartment())
                    .build());
        }
    }

    @Transactional
    public void workerShiftRegister(WorkerShiftCreateReq workerShiftCreateReq) {
        if (workerShiftRepository.findByWorkerIdAndWorkingDay(workerShiftCreateReq.getWorkerId(), workerShiftCreateReq.getWorkingDay()).isEmpty()) {
            workerShiftRepository.save(WorkerShift.builder()
                            .worker(workerRepository.findById(workerShiftCreateReq.getWorkerId()).get())
                            .shiftStartTime(workerShiftCreateReq.getShiftStartTime())
                            .shiftEndTime(workerShiftCreateReq.getShiftEndTime())
                            .workingDay(workerShiftCreateReq.getWorkingDay())
                    .build());
        }
    }

    public WorkerRes findWorkerById(Long workerId) {
        Optional<Worker> worker = workerRepository.findById(workerId);
        if (worker.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        return new WorkerRes(worker.get());
    }

    public List<WorkerRes> findAll(Pageable pageable) {
        return workerRepository.findAll(pageable).stream().map(WorkerRes::new).collect(Collectors.toList());
    }

    public WorkerShiftRes findWorkerShiftByWorkerIdAndDate(Long workerId, LocalDate date) {
        Optional<WorkerShift> workerShift = workerShiftRepository.findByWorkerIdAndWorkingDay(workerId, date);
        if (workerShift.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        return new WorkerShiftRes(workerShift.get());
    }

    public List<WorkerShiftRes> findAllWorkerShiftByWorkerId(Long workerId, Pageable pageable) {
        return workerShiftRepository.findAllByWorkerId(workerId, pageable).stream().map(WorkerShiftRes::new).collect(Collectors.toList());
    }
}
