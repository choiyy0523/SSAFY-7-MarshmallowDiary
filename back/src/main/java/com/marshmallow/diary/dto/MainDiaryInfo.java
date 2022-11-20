package com.marshmallow.diary.dto;

import lombok.*;
import java.util.Date;
import java.util.UUID;



@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Setter
public class MainDiaryInfo {
    private Date day;
    private String emotion;

    public static MainDiaryInfo MainDiaryInfoCreate(Date day,  String emotion){
        return MainDiaryInfo.builder()
                .day(day)
                .emotion(emotion)
                .build();
    }


}
