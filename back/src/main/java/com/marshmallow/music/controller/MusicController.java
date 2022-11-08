package com.marshmallow.music.controller;

import com.marshmallow.music.dto.MusicRequest;
import com.marshmallow.music.service.MusicService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RequiredArgsConstructor
@RestController
@RequestMapping("/music")
@ApiOperation(value = "[음악] Music Controller")
public class MusicController {

    private final MusicService musicService;

    @PostMapping("/regist")
    @ApiOperation(value="노래 등록", notes = "노래 제목, 가수, 감정, url 입력하여 노래 등록하는 기능")
    public ResponseEntity<?> registDiary(@RequestBody MusicRequest.Create request){
        int regist = musicService.regist(request);
        if(regist == 0){
            return ResponseEntity.ok().body("true");
        }else if(regist == 1){
            return ResponseEntity.ok().body("제목, 가수, 감정, url을 모두 입력해주세요");
        }else{
            return ResponseEntity.ok().body("이미 등록된 노래가 존재합니다.");
        }
    }



}

