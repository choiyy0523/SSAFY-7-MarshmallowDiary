package com.marshmallow.diary.repository;

import com.marshmallow.diary.entity.Diary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface DiaryRpository extends JpaRepository<Diary, UUID> {
}

