package com.marshmallow.diary.dto;

import lombok.*;

import java.util.Date;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Setter
public class DiarySearch {
    private Date date;
    private String title;
    private String sub_content;
    private String header_img;

    public static DiarySearch DiarySearchCreate(Date date, String title, String sub_content, String header_img){
        return DiarySearch.builder()
                .date(date)
                .title(title)
                .sub_content(sub_content)
                .header_img(header_img)
                .build();
    }
}
