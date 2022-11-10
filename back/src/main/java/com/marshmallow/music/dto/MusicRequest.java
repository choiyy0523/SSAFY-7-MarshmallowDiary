package com.marshmallow.music.dto;

import lombok.*;

public class MusicRequest {

    @Getter
//    @NoArgsConstructor(access = AccessLevel.PRIVATE)
//    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    public static class Create{
        private String title;
        private String singer;
        private String emotion;
        private String url;
    }
}
