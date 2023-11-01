package com.lego.apiservice.usage.entity.domain;

import com.lego.apiservice.category.entity.domain.Category;
import com.lego.apiservice.server.entity.Server;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Usage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    private String teamName;
}
