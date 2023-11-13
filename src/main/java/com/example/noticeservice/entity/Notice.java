package com.example.noticeservice.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Notice {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long noticeId;

    private String title;
    private String content;

    @Column(columnDefinition = "BOOLEAN")
    private boolean isRead;

    @Column(updatable = false)
    private Long senderId;

    @Column(updatable = false)
    private Long receiverId;

    @Column(columnDefinition = "BOOLEAN")
    private boolean isSenderDeleted;

    @Column(columnDefinition = "BOOLEAN")
    private boolean isReceiverDeleted;

    @CreatedDate
    private LocalDateTime createdAt;

}
