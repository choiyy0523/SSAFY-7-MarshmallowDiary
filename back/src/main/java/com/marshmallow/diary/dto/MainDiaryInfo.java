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
    private UUID diaryId;
    private String emotion;

    public static MainDiaryInfo MainDiaryInfoCreate(Date day, UUID diaryId, String emotion){
        return MainDiaryInfo.builder()
                .day(day)
                .diaryId(diaryId)
                .emotion(emotion)
                .build();
    }


}
