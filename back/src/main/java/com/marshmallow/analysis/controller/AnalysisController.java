package com.marshmallow.analysis.controller;

import com.marshmallow.analysis.dto.AnalysisRequest;
import com.marshmallow.analysis.dto.AnalysisResponse;
import com.marshmallow.analysis.service.AnalysisService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.util.Map;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/analysis")
@ApiOperation(value = "[분석] Analysis Controller")
public class AnalysisController {

    @Autowired
    private AnalysisService analysisService;

//    @PostMapping("/{diaryId}")
//    public ResponseEntity<AnalysisResponse.getResult> resultEmotion(UUID diaryId, HttpServletRequest res) throws Exception {
//        AnalysisResponse.getResult response = analysisService.result(diaryId);
//
//        return ResponseEntity.status(200).body(response);
//    }

    @PostMapping("/{diaryId}}")
    @ApiOperation(value = "해당 일기의 감정 분석 결과", notes = "다이어리 아이디를 입력받아 해당 일기의 감정 분석 결과 조회 기능")
    public ResponseEntity getEmotion(@PathVariable UUID diaryId, HttpServletRequest res) throws Exception {

        AnalysisResponse.getResult result = analysisService.result(diaryId);

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
    ResponseEntity getId() throws Exception {
        AnalysisResponse.getdiaryId result = analysisService.getdiaryId();

        return ResponseEntity.status(200).body(result);
    }

    @GetMapping("/all")
    @ApiOperation(value = "전체 기간 동안 감정 분석 결과 조회", notes = "전체 기간동안 긍정, 중립, 부장의 값의 합을 제공")
    ResponseEntity getAllEmotion() {
        AnalysisResponse.getAllEmotion result = analysisService.getAllEmotion();

        return ResponseEntity.status(200).body(result);
    }

    @GetMapping("/month")
    @ApiOperation(value = "해당 월의 감정 분석 결과 조회", notes = "해당 월의 긍정, 중립, 부장의 값의 합을 제공")
    ResponseEntity getMonthEmotion(@RequestBody AnalysisRequest.monthReq req) throws ParseException {
        AnalysisResponse.getAllEmotion result = analysisService.getMonthEmotion(req.getYear(), req.getMonth());
        return ResponseEntity.status(200).body(result);
    }

}
