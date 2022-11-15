package com.marshmallow.analysis;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.marshmallow.analysis.controller.AnalysisController;
import com.marshmallow.analysis.dto.AnalysisRequest;
import com.marshmallow.analysis.service.AnalysisService;
import com.marshmallow.diary.dto.DiaryRequest;
import com.marshmallow.diary.dto.DiaryResponse;
import com.marshmallow.diary.service.DiaryService;
import com.marshmallow.user.dto.UserRequest;
import com.marshmallow.user.dto.UserResponse;
import com.marshmallow.user.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.Date;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
public class AnalysisControllerTest {
    @InjectMocks
    private AnalysisController analysisController;
    @Mock
    private AnalysisService analysisService;
    @Autowired
    // HTTP 호출을 위한 객체
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private UserService userService;
    @Autowired
    private DiaryService diaryService;
    private String token;

    @BeforeEach
    public void init() throws Exception {
        // 유저 데이터 생성
        UserResponse.Token tokenDto = userService.login(UserRequest.Login.builder()
                .nickname("analysis-tester")
                .authId("analysis-tester").build());
        token = "Bearer " + tokenDto.getAccessToken();

        // 일기 데이터 생성
        String dateString = "2022-11-09";
        SimpleDateFormat dtFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date = dtFormat.parse(dateString);
        String title = "배가고파요";
        String content = "오늘 밥 뭐더라";
        int weather = 1;

        DiaryResponse.Regist regist = diaryService.registDiary(DiaryRequest.Created.builder()
                .title(title)
                .content(content)
                .weather(weather)
                .date(date)
                .build());
    }

    /////////////////// 일기 조회 ////////////////////
    @Test
    @DisplayName("특정 날짜의 일기 감정 분석 결과 조회")
    @Rollback
    @Transactional
    public void getEmotion_Exist() throws Exception {
        // 일기가 존재하는 날짜
        String date = "2022-11-09";

        mockMvc.perform(
                MockMvcRequestBuilders
                        .get("/analysis/{date}", date)
                        .header(HttpHeaders.AUTHORIZATION, token)
                        .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk());
    }

//    @Test
//    @DisplayName("특정 날짜의 일기 감정 분석 결과 조회 (일기 없을 때)")
//    @Rollback
//    @Transactional
//    public void getEmotion_NotExist() throws Exception {
//
//        // 일기가 존재하지 않는 날짜
//        String date = "2022-11-01";
//
//        mockMvc.perform(
//                MockMvcRequestBuilders
//                        .get("/analysis/{date}", date)
//                        .header(HttpHeaders.AUTHORIZATION, token)
//                )
//                .andExpect(status().isInternalServerError());
//    }

    /////////////////// 전체 기간 일기 분석 조회 ////////////////////
    @Test
    @DisplayName("전체 일기 감정 분석 결과 조회")
    @Rollback
    @Transactional
    public void getEmotion_All() throws Exception {
        mockMvc.perform(
                MockMvcRequestBuilders
                        .get("/analysis/all")
                        .header(HttpHeaders.AUTHORIZATION, token)
                        .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("얼마나 일기를 꾸준하게 작성했는지 조회")
    @Rollback
    @Transactional
    public void getLoyalty() throws Exception {
        mockMvc.perform(
                MockMvcRequestBuilders
                        .get("/analysis/loyalty")
                        .header(HttpHeaders.AUTHORIZATION, token)
                        .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("해당 월의 감정 분석 결과 조회")
    @Rollback
    @Transactional
    public void getEmotion_Month() throws Exception {

        String requestContent = objectMapper.writeValueAsString(AnalysisRequest.monthReq.builder().year(2022).month(11).build());

        mockMvc.perform(
                        MockMvcRequestBuilders
                                .post("/analysis/month")
                                .content(requestContent)
                                .header(HttpHeaders.AUTHORIZATION, token)
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("긍정 일기 조회")
    @Rollback
    @Transactional
    public void getEmotion_Positive() throws Exception {
        mockMvc.perform(
                        MockMvcRequestBuilders
                                .get("/analysis/positive")
                                .header(HttpHeaders.AUTHORIZATION, token)
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk());
    }

}
