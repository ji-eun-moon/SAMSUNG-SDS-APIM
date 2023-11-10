package com.lego.secondsubmit.dto.response;


import lombok.*;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductRes {

    private String line;
    private String status;
    private String productName;
    private String productionQuantity;
    private String defectQuantity;
    private LocalDateTime productionStartTime;
    private LocalDateTime productionEndTime;

}
