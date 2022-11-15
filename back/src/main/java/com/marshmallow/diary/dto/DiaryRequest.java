package com.marshmallow.diary.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.util.Date;


public class DiaryRequest {

        @Builder
        @Getter
        @NoArgsConstructor(access = AccessLevel.PRIVATE)
        @AllArgsConstructor(access = AccessLevel.PRIVATE)
        @ToString
        public static class Created{
                private String title;
                private String content;
                private int weather;
                @JsonFormat(pattern = "yyyy-MM-dd" )
                private Date date;
        }

        @Getter
        @NoArgsConstructor(access = AccessLevel.PRIVATE)
        @AllArgsConstructor(access = AccessLevel.PRIVATE)
        @ToString
        public static class GetDiary{
                @JsonFormat(pattern = "yyyy-MM-dd" )
                private Date date;
        }

        @Getter
        @NoArgsConstructor(access = AccessLevel.PRIVATE)
        @AllArgsConstructor(access = AccessLevel.PRIVATE)
        @ToString
        @Setter
        public static class TotalDiary{
                private int year;
                private int month;
        }

        @Getter
        @NoArgsConstructor(access = AccessLevel.PRIVATE)
        @AllArgsConstructor(access = AccessLevel.PRIVATE)
        @ToString
        public static class Search{
                private String keyword;
        }

}
