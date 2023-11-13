package com.example.noticeservice.usecheck.dto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Member {

    private Long memberId;
    private String employeeId;
    private String name;
    private String password;
    private String imageUrl;
    private String department;
    private String position;
    private String email;
    private LocalDateTime createdAt;

}
