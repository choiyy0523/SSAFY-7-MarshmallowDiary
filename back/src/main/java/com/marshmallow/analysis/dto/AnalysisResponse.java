package com.marshmallow.analysis.dto;

import com.marshmallow.analysis.entity.Analysis;
import com.marshmallow.music.entity.Music;
import lombok.*;


import static java.lang.Math.round;

public class AnalysisResponse {

    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @ToString
    @Getter
    public static class getResult{
        private int positive;
        private int negative;
        private int neutral;
        private String title;
        private String singer;
        private String url;

    public static AnalysisResponse.getResult build(Analysis analysis, Music music){
        return getResult.builder()
                .positive(round(analysis.getPositive()))
                .negative(round(analysis.getNegative()))
                .neutral(round(analysis.getNeutral()))
                .title(music.getTitle())
                .singer(music.getSinger())
                .url(music.getUrl())
                .build();
        }
    }

    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @ToString
    @Getter
    public static class getdiaryId{

        private String diaryId;
        private String date;

        public static AnalysisResponse.getdiaryId build(String diaryId, String date){
            return getdiaryId.builder()
                    .diaryId(diaryId)
                    .date(date)
                    .build();
        }
    }

    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @ToString
    @Getter
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

    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @ToString
    @Getter
    public static class getReport{
        private float positive;
        private float negative;
        private float neutral;
        private int positiveCnt;
        private float negativeCnt;
        private float neutralCnt;
        private String bestPositiveDate;

        public static AnalysisResponse.getReport build(float positive, float negative, float neutral, int positiveCnt, int negativeCnt, int neutralCnt, String bestPositiveDate){
            return getReport.builder()
                    .positive(positive)
                    .negative(negative)
                    .neutral(neutral)
                    .positiveCnt(positiveCnt)
                    .negativeCnt(negativeCnt)
                    .neutralCnt(neutralCnt)
                    .bestPositiveDate(bestPositiveDate)
                    .build();
        }

    }

}
