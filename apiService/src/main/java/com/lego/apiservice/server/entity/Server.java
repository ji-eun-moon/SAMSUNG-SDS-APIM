package com.lego.apiservice.server.entity;

import com.lego.apiservice.category.entity.domain.Category;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Server {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "server_id")
    private Long id;

    private String serverName;
    private String description;
    private String endPoint;
    private String employeeId;
    private String teamName;

    @OneToMany(mappedBy = "server")
    private List<Category> categoryList = new ArrayList<>();
}
