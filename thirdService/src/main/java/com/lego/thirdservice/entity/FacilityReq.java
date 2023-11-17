package com.lego.thirdservice.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FacilityReq {
    @Schema(name = "facilityId", description = "시설 시퀀스", example = "1")
    private Long facilityId;

    @Schema(name = "facilityName", description = "시설명", example = "휘트니스 센터")
    private String facilityName;

    @Schema(name = "facilityType", description = "시설 타입", example = "운동 시설")
    private String facilityType;

    @Schema(name = "location", description = "2층", example = "2층")
    private String location;

    public Facility toFacility() {
        return Facility.builder()
                .id(this.facilityId)
                .facilityName(facilityName)
                .facilityType(facilityType)
                .location(location)
                .build();
    }
}
