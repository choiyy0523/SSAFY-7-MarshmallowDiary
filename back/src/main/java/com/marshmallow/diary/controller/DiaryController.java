package com.marshmallow.diary.controller;

import com.marshmallow.diary.dto.DiaryRequest;
import com.marshmallow.diary.dto.DiaryResponse;
import com.marshmallow.diary.service.DiaryService;
import com.marshmallow.exception.AlreadyRegistDiary;
import com.marshmallow.exception.CanNotRegistDiary;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.ParseException;
import java.util.Date;
import java.util.List;


@RequiredArgsConstructor
@RestController
@RequestMapping("/diary")
@ApiOperation(value = "[다이어리] Diary Controller")
public class DiaryController {

    private final DiaryService diaryService;

    @PostMapping("/regist")
    @ApiOperation(value="다이어리 등록", notes = "제목,내용,날씨,사진,날짜를 입력받아 다이어리를 등록하는 기능")
    public ResponseEntity<DiaryResponse.Regist> regist(@RequestPart(value = "photos" ,required = false)  List<MultipartFile> photos, @RequestPart(value = "diary") DiaryRequest.Create diary) throws JSONException, IOException, AlreadyRegistDiary, CanNotRegistDiary {
        return ResponseEntity.ok().body(diaryService.registDiary(diary, photos));
    }

    @GetMapping("/detail/{date}")
    @ApiOperation(value="다이어리 조회", notes = "date로 해당 다이어리 내용 조회하는 기능")
    public ResponseEntity<DiaryResponse.Detail> detailDiary(@PathVariable("date") @DateTimeFormat(pattern="yyyy-MM-dd") Date date) {
        DiaryResponse.Detail diaryInfo = diaryService.getDetailDiary(date);
        if(diaryInfo == null){
            return ResponseEntity.status(404).body(diaryInfo);
        }
        return ResponseEntity.ok().body(diaryInfo);
    }

    @PostMapping("/delete")
    @ApiOperation(value="다이어리 삭제", notes = "date 로 해당 다이어리 삭제하는 기능")
    public ResponseEntity<?> deleteDiary(@RequestBody DiaryRequest.GetDiary request) {
        DiaryResponse.Delete result = diaryService.delete(request);
        if(result.getResult().equals("false")){
            return ResponseEntity.status(404).body(result);
        }
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("")
    @ApiOperation(value="한달 다이어리 기록 조회", notes = "요청한 연도, 월에 맞는 다이어리 기록 조회 기능")
    public ResponseEntity<?> totalDiary(@RequestBody DiaryRequest.TotalDiary request) throws ParseException {
        return ResponseEntity.ok().body(diaryService.searchTotalDiary(request));
    }

    @PostMapping("/search")
    @ApiOperation(value="검색 기록 조회", notes = "키워드로 다이어리 검색")
    public ResponseEntity<DiaryResponse.SearchResponse> searchKeyword(@RequestBody DiaryRequest.Search request) throws ParseException {
        return ResponseEntity.ok().body(diaryService.searchKeyword(request));
    }

}

