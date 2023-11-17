package com.lego.firstsubmit.service;

import com.lego.firstsubmit.domain.Employee;
import com.lego.firstsubmit.repository.EmployeeRepository;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.FileReader;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Transactional
    public void register() throws IOException, CsvException {
        CSVReader reader = new CSVReader(new FileReader("employee_data.csv"));
        List<String[]> csvData = reader.readAll();

        for (int i = 1; i < csvData.size(); i++) {
            String[] row = csvData.get(i);
            employeeRepository.save(Employee.builder()
                            .id(Long.valueOf(row[0]))
                            .department(row[1])
                            .position(row[2])
                            .name(row[3])
                            .tel(row[4])
                            .email(row[5])
                            .salary(Integer.valueOf(row[6]))
                            .hireDate(LocalDate.parse(row[7]))
                    .build());
        }

    }
}
