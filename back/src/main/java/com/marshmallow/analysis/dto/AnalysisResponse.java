package com.marshmallow.analysis.dto;

import com.marshmallow.analysis.entity.Analysis;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


import static java.lang.Math.round;

public class AnalysisResponse {

    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class getResult{
        private int positive;
        private int negative;
        private int neutral;

    public static AnalysisResponse.getResult build(Analysis analysis){
        return AnalysisResponse.getResult.builder()
                .positive(round(analysis.getPositive()))
                .negative(round(analysis.getNegative()))
                .neutral(round(analysis.getNeutral()))
                .build();
        }
    }

    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class getdiaryId{

        private String diaryId;

        public static AnalysisResponse.getdiaryId build(String diaryId){
            return AnalysisResponse.getdiaryId.builder()
                    .diaryId(diaryId)
                    .build();
        }
    }

    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class getAllEmotion{
        private float positive;
        private float negative;
        private float neutral;

        public static AnalysisResponse.getAllEmotion build(Analysis analysis){
            return getAllEmotion.builder()
                    .positive(analysis.getPositive())
                    .negative(analysis.getNegative())
                    .neutral(analysis.getNeutral())
                    .build();
        }
    }

}
