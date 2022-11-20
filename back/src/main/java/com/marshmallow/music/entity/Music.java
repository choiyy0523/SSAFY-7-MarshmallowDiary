package com.marshmallow.music.entity;

import com.marshmallow.music.dto.MusicRequest;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
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
public class Music {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Type(type="uuid-char")
    @Column(name = "music_id")
    private UUID musicId;

    @Column(name = "title" , nullable = false)
    private String title;

    @Column(name = "singer" , nullable = false)
    private String singer;

    @Column(name = "emotion" , nullable = false)
    private String emotion;

    @Column(name = "url" , nullable = false)
    private String url;

    public static Music MusicCreate(MusicRequest.Create request){
        return Music.builder()
                .title(request.getTitle())
                .singer(request.getSinger())
                .emotion(request.getEmotion())
                .url(request.getUrl())
                .build();
    }
}
