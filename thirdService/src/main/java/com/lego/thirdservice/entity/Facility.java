package com.lego.thirdservice.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class Facility {

    @Id
    @Column(name = "facility_id")
    @Schema(name = "facilityId", description = "시설 시퀀스", example = "1")
    private Long id;

    @Schema(name = "facilityName", description = "시설명", example = "휘트니스 센터")
    private String facilityName;

    @Schema(name = "facilityType", description = "시설 타입", example = "운동 시설")
    private String facilityType;

    @Schema(name = "location", description = "2층", example = "2층")
    private String location;
}
