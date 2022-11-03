package com.marshmallow.analysis.repository;

import com.marshmallow.analysis.entity.Analysis;
import com.marshmallow.diary.entity.Diary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AnaylsisRepository extends JpaRepository<Analysis, UUID> {

        Optional<Analysis> findByDiary_DiaryId(UUID diaryId);








}
