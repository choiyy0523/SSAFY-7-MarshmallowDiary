package com.marshmallow.diary.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import java.util.Date;
import java.util.UUID;


public class DiaryRequest {

        @Getter
        @NoArgsConstructor(access = AccessLevel.PRIVATE)
        @AllArgsConstructor(access = AccessLevel.PRIVATE)
        @ToString
        public static class Create{
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
        public static class getDiary{
                private UUID diaryId;
        }

}
