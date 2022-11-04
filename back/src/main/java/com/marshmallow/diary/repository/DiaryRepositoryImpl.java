package com.marshmallow.diary.repository;

import com.marshmallow.diary.entity.Diary;
import com.marshmallow.diary.entity.QDiary;
import com.marshmallow.user.entity.User;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;
import java.util.List;

public class DiaryRepositoryImpl implements DiaryRepository.DiaryRepositoryCustom {

    @Autowired
    EntityManager em;

    @Override
    public List<Diary> searchKeyword(User user, String keyword) {
        JPAQueryFactory query = new JPAQueryFactory(em);

        QDiary d = new QDiary("d");

        return query
                .selectFrom(d)
                .where(d.user.eq(user)
                        .and(
                            d.title.contains(keyword)
                            .or(d.content.contains(keyword))
                        ))
                .fetch();
    }
}
