package com.marshmallow.diary.repository;

import com.marshmallow.diary.entity.Diary;
import com.marshmallow.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface DiaryRepository extends JpaRepository<Diary, UUID> {

    Optional<Diary> findFirstByUser_UserIdOrderByDateDesc(UUID userId);

    List<Diary> findAllByDateBetween(Date st, Date ed);

    List<Diary> findAllByUser_UserIdAndDateBetweenOrderByDate(UUID userId,Date st, Date ed);


    Optional<Diary> findByUser_UserIdAndDate(UUID userId, Date date);

    List<Diary> findAllByUser_UserId(UUID userId);

    public interface DiaryRepositoryCustom {
        List<Diary> searchKeyword(User user, String keyword);
    }
}



