package com.marshmallow.diary.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.marshmallow.diary.entity.Diary;
import lombok.*;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public class DiaryResponse {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Regist{

        @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+9")
        private Date date;

        public static DiaryResponse.Regist build(Date date){
            return Regist.builder()
                    .date(date)
                    .build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Detail{
        private String title;
        private String content;
        private int weather;
        private String[] photo;

        @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+9")
        private Date date;

        public static DiaryResponse.Detail build(Diary diary, String[] photo){
            return Detail.builder()
                    .title(diary.getTitle())
                    .content(diary.getContent())
                    .weather(diary.getWeather())
                    .photo(photo)
                    .date(diary.getDate())
                    .build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Delete{
        private String result;
        public static DiaryResponse.Delete build(String result){
            return Delete.builder()
                    .result(result)
                    .build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class totalDiary{
        private List<MainDiaryInfo> list;
        public static DiaryResponse.totalDiary build(List<MainDiaryInfo> result){
            return totalDiary.builder()
                    .list(result)
                    .build();
        }
    }

}
