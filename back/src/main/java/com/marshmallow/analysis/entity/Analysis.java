
package com.marshmallow.analysis.entity;

import com.marshmallow.diary.entity.Diary;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Analysis {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Type(type="uuid-char")
    @Column(name = "analysis_id")
    private UUID analysisId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "diary_id")
    private Diary diary;

    @Column(name = "sentiment" , nullable = false)
    private String sentiment;

    @Column(name = "positive" , nullable = false)
    private float positive;

    @Column(name = "negative" , nullable = false)
    private float negative;

    @Column(name = "neutral" , nullable = false)
    private float neutral;


    public Analysis create (Diary diary, float positive, float negative, float neutral){
        return Analysis.builder()
                .diary(diary)
                .positive(positive)
                .negative(negative)
                .neutral(neutral)
                .build();
    }
}
