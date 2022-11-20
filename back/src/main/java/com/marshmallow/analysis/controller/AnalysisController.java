package com.marshmallow.analysis.controller;

import com.marshmallow.analysis.dto.AnalysisRequest;
import com.marshmallow.analysis.dto.AnalysisResponse;
import com.marshmallow.analysis.service.AnalysisService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.Date;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/analysis")
@ApiOperation(value = "[분석] Analysis Controller")
public class AnalysisController {

    @Autowired
    private AnalysisService analysisService;

    @GetMapping("/{date}")
    @ApiOperation(value = "해당 일기의 감정 분석 결과 및 노래 추천", notes = "다이어리 날짜를 입력받아 해당 일기의 감정 분석 결과 및 감정에 따른 노래 추천")
    public ResponseEntity<AnalysisResponse.getResult> getEmotion(@PathVariable("date") @DateTimeFormat(pattern="yyyy-MM-dd") Date date) throws Exception {

        AnalysisResponse.getResult result = analysisService.diaryResult(date);
        System.out.println("결과        "+result);

        return ResponseEntity.status(200).body(result);
    }


    @GetMapping("/loyalty")
    @ApiOperation(value = "메인페이지 마로,별로,시로 값과 멘트 전달", notes = "얼마나 일기를 꾸준하게 작성했는지 판단하는 기능")
    ResponseEntity<Map<Integer, String>> showMain(){
        Map<Integer, String> result = analysisService.main();

        return ResponseEntity.status(200).body(result);
    }

    @GetMapping("/positive")
    @ApiOperation(value = "긍정 일기 조회", notes = "긍정적인 일기를 조회하는 기능")
    ResponseEntity<AnalysisResponse.getdiaryId> getId() throws Exception {
        AnalysisResponse.getdiaryId result = analysisService.getdiaryId();

        return ResponseEntity.status(200).body(result);
    }

    @GetMapping("/all")
    @ApiOperation(value = "전체 기간 동안 감정 분석 결과 조회", notes = "전체 기간동안 긍정, 중립, 부장의 값의 합을 제공")
    ResponseEntity<AnalysisResponse.getReport> getAllEmotion() {
        AnalysisResponse.getReport result = analysisService.getAllEmotion();
        return ResponseEntity.status(200).body(result);
    }

    @PostMapping("/month")
    @ApiOperation(value = "해당 월의 감정 분석 결과 조회", notes = "해당 월의 긍정, 중립, 부정의 값의 합, 횟수, 가장 긍정적인 날을 제공")
    ResponseEntity<AnalysisResponse.getReport> getMonthEmotion(@RequestBody AnalysisRequest.monthReq req) throws ParseException {
        AnalysisResponse.getReport result = analysisService.getMonthEmotion(req.getYear(), req.getMonth());
        return ResponseEntity.status(200).body(result);
    }

}
