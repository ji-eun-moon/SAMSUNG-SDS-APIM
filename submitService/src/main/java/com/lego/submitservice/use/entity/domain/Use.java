package com.lego.submitservice.use.entity.domain;

import com.lego.submitservice.provide.entity.domain.State;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Use {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "use_id")
    private Long id;
    private Long categoryId;
    private String description;
    private String teamName;
    private String userName;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private State state;
    private String denyReason;

    public void changeState(State state) {
        this.state = state;
    }

    public void setDenyReason(String s) {
        this.denyReason = s;
    }

    public void setModifiedAt() {
        this.modifiedAt = LocalDateTime.now();
    }
}
