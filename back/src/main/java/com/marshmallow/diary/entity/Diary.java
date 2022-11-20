package com.marshmallow.diary.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.marshmallow.diary.dto.DiaryRequest;
import com.marshmallow.user.entity.User;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Getter
@Builder
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Setter
public class Diary {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Type(type="uuid-char")
    @Column(name = "diary_id")
    private UUID diaryId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "title" , nullable = false)
    private String title;

    @Column(name = "content" , nullable = false)
    private String content;

    @Column(name = "weather" , nullable = false)
    private int weather;

    @Column(name = "photo")
    private String photo;

    @Column(name = "date" , nullable = false)
    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    private Date date;
    public static Diary DiaryCreate(User user, DiaryRequest.Created request, String photo){
        return Diary.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .weather(request.getWeather())
                .date(request.getDate())
                .photo(photo)
                .user(user)
                .build();
    }
}
