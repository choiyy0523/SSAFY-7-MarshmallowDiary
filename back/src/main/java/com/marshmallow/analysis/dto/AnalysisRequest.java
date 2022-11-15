package com.marshmallow.analysis.dto;

import lombok.*;

public class AnalysisRequest {

    @Builder
    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class monthReq{
        private int year;
        private int month;
    }
}
