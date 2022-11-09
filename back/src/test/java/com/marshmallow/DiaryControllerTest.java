package com.marshmallow;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.marshmallow.diary.controller.DiaryController;
import com.marshmallow.diary.service.DiaryService;
import org.junit.jupiter.api.BeforeEach; //not junit JUPITER!
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
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import java.util.Date;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.log;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
public class DiaryControllerTest {

    @InjectMocks
    private DiaryController diaryController;

    @Mock
    private DiaryService diaryService;

    @Autowired
    // HTTP 호출을 위한 객체
    private MockMvc mockMvc;

    @BeforeEach
    public void init(){
//        mockMvc = MockMvcBuilders
//                .standaloneSetup(diaryController) // 테스트 대상 Controller 를 넣어준다.
//                .alwaysExpect(MockMvcResultMatchers.status().isOk()) // 특정 필수 조건을 지정
//                .build();
    }

//    public static class Diary {
//        private String title = "피곤해";
//        private String content = "너무너무 피곤하다";
//        private int weather = "1";
//        @JsonFormat(pattern = "yyyy-MM-dd" )
//        private Date date;
//    }

    /***********************다이어리 조회***********************/
    @Test
    @DisplayName("특정 일에 작성한 일기 조회")
    @Rollback
    public void detailsDiary_Exist() throws Exception {



        mockMvc.perform(
                MockMvcRequestBuilders
                        .get("/diary/detail/{date}", "2022-11-09")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLsnbTrj4Tsl7AiLCJpYXQiOjE2Njc4OTczODUsImV4cCI6MTY3MDMxNjU4NX0.ipmGbA3lUrkLVmtnxzjsTeOvXiBoM6xKBqbRZZjUSM8")
//                        .accept(MediaType.APPLICATION_JSON)
        )
                .andExpect(status().isOk());


    }

    @Test
    @DisplayName("특정 일에 작성한 일기 조회")
    @Rollback
    public void detailsDiary_NotExist(){
        // given


        // when


        // then


    }
    
    
    /***********************다이어리 등록***********************/
    
    
    @Test
    @DisplayName("일기 작성-빈 내용")
    @Rollback
    public void createDiary_EmptyContent(){
        // given


        // when


        // then


    }

    @Test
    @DisplayName("일기 작성-텍스트만")
    @Rollback
    public void createDiary_Text(){
        // given


        // when


        // then

    }

    @Test
    @DisplayName("일기 작성-텍스트와 사진")
    @Rollback
    public void createDiary_TextAndPicture(){
        // given


        // when


        // then
    }

    @Test
    @DisplayName("일기 작성-텍스트와 사진 여러장")
    @Rollback
    public void createDiary_TextAndPictures(){
        // given


        // when


        // then
    }


    /***********************다이어리 삭제***********************/



    /***********************한달 다이어리 기록 조회***********************/


    /***********************검색 기록 조회***********************/
}
