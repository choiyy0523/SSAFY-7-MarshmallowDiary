package com.marshmallow.diary.repository;

import com.marshmallow.diary.entity.Diary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface DiaryRepository extends JpaRepository<Diary, UUID> {

    Optional<Diary> findFirstByOrderByDateDesc();

    List<Diary> findAllByDateBetween(Date st, Date ed);

    List<Diary> findAllByUser_UserIdAndDateBetween(UUID userId,Date st, Date ed);





}



