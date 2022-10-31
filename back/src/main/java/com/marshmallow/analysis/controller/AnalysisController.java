package com.marshmallow.analysis.controller;

import com.marshmallow.analysis.dto.AnalysisResponse;
import com.marshmallow.analysis.service.AnalysisService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/analysis")
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
    public ResponseEntity getEmotion(@PathVariable UUID diaryId, HttpServletRequest res) throws Exception {

        AnalysisResponse.getResult result = analysisService.result(diaryId);

        return ResponseEntity.status(200).body(result);
    }

    @GetMapping("/loyalty")
    ResponseEntity<Map<Integer, String>> showMain(){
        Map<Integer, String> result = analysisService.main();

        return ResponseEntity.status(200).body(result);
    }

    @GetMapping("/positive")
    ResponseEntity getId() throws Exception {
        AnalysisResponse.getdiaryId result = analysisService.getdiaryId();

        return ResponseEntity.status(200).body(result);
    }

    @GetMapping("/all")
    ResponseEntity getAllEmotion() {
        AnalysisResponse.getAllEmotion result = analysisService.getAllEmotion();

        return ResponseEntity.status(200).body(result);
    }

}
