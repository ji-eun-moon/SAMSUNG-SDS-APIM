package com.itda.memberservice.notice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Notice {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long noticeId;

    private String content;

    // 작성자 from

    // 받는 사람 to

    private Boolean check;
    private LocalDateTime createdAt;

}
