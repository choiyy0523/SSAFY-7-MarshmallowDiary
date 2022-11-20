package com.marshmallow.music.repository;

import com.marshmallow.music.entity.Music;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MusicRepository extends JpaRepository<Music, UUID> {
    Optional<Music> findByTitleAndSinger(String title, String singer);

    List<Music> findAllByEmotion(String sentiment);
}
