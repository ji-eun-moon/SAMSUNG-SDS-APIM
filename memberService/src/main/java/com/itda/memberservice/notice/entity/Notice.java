package com.itda.memberservice.notice.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class Notice {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long noticeId;

    private String content;

    // 작성자 from

    // 받는 사람 to

    @Column(columnDefinition = "BOOLEAN")
    private boolean isRead;

    @CreatedDate
    private LocalDateTime createdAt;

}
