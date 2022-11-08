package com.marshmallow.music.service;

import com.marshmallow.music.dto.MusicRequest;
import com.marshmallow.music.entity.Music;
import com.marshmallow.music.repository.MusicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MusicService {

    private final MusicRepository musicRepository;
    public int regist(MusicRequest.Create request) {
        if(request.getTitle() == null || request.getEmotion() == null || request.getSinger() == null || request.getUrl() == null){
            return 1;
        }
        Optional<Music> music = musicRepository.findByTitleAndSinger(request.getTitle(), request.getSinger());
        if(music.isPresent()){
            return 2;
        }
        Music save = Music.MusicCreate(request);
        musicRepository.save(save);
        return 0;
    }
}
