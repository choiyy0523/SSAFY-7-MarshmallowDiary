package com.marshmallow.music.controller;

import com.marshmallow.music.dto.MusicRequest;
import com.marshmallow.music.service.MusicService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.util.ArrayList;
import java.util.List;


@RequiredArgsConstructor
@RestController
@RequestMapping("/music")
@ApiOperation(value = "[음악] Music Controller")
public class MusicController {

    private final MusicService musicService;

    @PostMapping("/regist")
    @ApiOperation(value="노래 등록", notes = "노래 제목, 가수, 감정, url 입력하여 노래 등록하는 기능")
    public ResponseEntity<?> registMusic(@RequestBody MusicRequest.Create request){
        int regist = musicService.regist(request);
        if(regist == 0){
            return ResponseEntity.ok().body("true");
        }else if(regist == 1){
            return ResponseEntity.ok().body("제목, 가수, 감정, url을 모두 입력해주세요");
        }else{
            return ResponseEntity.ok().body("이미 등록된 노래가 존재합니다.");
        }
    }

    @GetMapping("/upload")
    public void uploadMusicByCsv() throws IOException {
        // csv 데이타 파일
        String curPath = new File("").getAbsolutePath();
        String filepath = curPath + "\\back\\src\\main\\resources\\";
        String filename = "neutral.csv";

        File csv = new File(filepath + filename);

        BufferedReader br = new BufferedReader(new FileReader(csv));

        String line = "";
        int lineNum = 0;
        while ((line = br.readLine()) != null) {
            if (lineNum++ == 0) continue;
            lineNum++;

            // -1 옵션은 마지막 "," 이후 빈 공백도 읽기 위한 옵션
            String[] token = line.split(",", -1);
            int idx = 1;

            String title = token[0].replace("\"", "");
            String singer = token[1].replace("\"", "");
            String emotion = token[2].replace("\"", "");
            String url = token[3].replace("\"", "");
            MusicRequest.Create request = new MusicRequest.Create(title, singer, emotion, url);

//            System.out.println(request);
            this.registMusic(request);
        }
        br.close();
        System.out.println("데이터 삽입 완료!!");
    }
}

