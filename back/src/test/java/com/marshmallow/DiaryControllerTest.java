package com.marshmallow;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.marshmallow.diary.controller.DiaryController;
import com.marshmallow.diary.service.DiaryService;
import lombok.*;

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
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import javax.transaction.Transactional;
import java.io.*;
import java.nio.file.Files;
import java.text.SimpleDateFormat;
import java.util.Date;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@Transactional
public class DiaryControllerTest {

    @InjectMocks
    private DiaryController diaryController;

    @Mock
    private DiaryService diaryService;

    @Autowired
    // HTTP 호출을 위한 객체
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    ResourceLoader loader;

    private final String accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLsnbTrj4Tsl7AiLCJpYXQiOjE2Njc4OTczODUsImV4cCI6MTY3MDMxNjU4NX0.ipmGbA3lUrkLVmtnxzjsTeOvXiBoM6xKBqbRZZjUSM8";

    @BeforeEach
    public void init() {
//        mockMvc = MockMvcBuilders
//                .standaloneSetup(diaryController) // 테스트 대상 Controller 를 넣어준다.
//                .alwaysExpect(MockMvcResultMatchers.status().isOk()) // 특정 필수 조건을 지정
//                .build();
    }

    @Builder
    @Getter
    public static class TestDiary{
        private String title;
        private String content;
        private int weather;
        @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+9")
        private Date date;
    }

    /***********************다이어리 조회***********************/
    @Test
    @DisplayName("특정 일에 작성한 일기 조회")
    @Rollback
    public void detailsDiary_Exist() throws Exception {
        mockMvc.perform(
                MockMvcRequestBuilders
                        .get("/diary/detail/{date}", "2022-11-09")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                )
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("존재하지 않는 날짜의 일기 조회")
    @Rollback
    public void detailsDiary_NotExist() throws Exception {
        mockMvc.perform(
                        MockMvcRequestBuilders
                                .get("/diary/detail/{date}", "2022-11-10")
                                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                )
                .andExpect(status().isNotFound());
    }

    /***********************다이어리 등록***********************/
    @Test
    @DisplayName("일기 작성-텍스트")
    @Rollback
    public void createDiary_Text() throws Exception {
        String dateString = "2000-01-03";
        SimpleDateFormat dtFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date = dtFormat.parse(dateString);

        String title = "배가고파요";
        String content = "오늘 밥 뭐더라";
        int weather = 1;

        TestDiary inputDiary = TestDiary.builder()
                .title(title)
                .content(content)
                .weather(weather)
                .date(date)
                .build();
        String requestContent = objectMapper.writeValueAsString(inputDiary);

        mockMvc.perform(
                        MockMvcRequestBuilders
                                .post("/diary/regist/diary")
                                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                                .content(requestContent)
                                .contentType(MediaType.APPLICATION_JSON_VALUE)
                )
                .andExpect(status().isOk());

        mockMvc.perform(
                        MockMvcRequestBuilders
                                .get("/diary/detail/{date}", dateString)
                                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("title").value(title))
                .andExpect(jsonPath("content").value(content))
                .andExpect(jsonPath("date").value(dateString))
                .andExpect(jsonPath("weather").value(Integer.toString(weather)))
//                .andExpect(jsonPath("photo").value(null))
        ;
    }

    @Test
    @DisplayName("일기 작성-사진 한장")
    @Rollback
    public void createDiary_Picture() throws Exception {
        String dateString = "2000-01-02";
        String curPath = new File("").getAbsolutePath();
        String filename = "\\src\\test\\images\\jeju.jpg";

        File file = new File(curPath + filename);
        MockMultipartFile multipartFile = new MockMultipartFile("photos", curPath + filename, "image/jpg", Files.readAllBytes(file.toPath()));
//        MockMultipartFile multipartFile = new MockMultipartFile("image", new FileInputStream(file));
//        MockMultipartFile multipartFile = new MockMultipartFile("photos", curPath + filename, "image/jpg", "<<jpg data>>".getBytes());

        mockMvc.perform(
                        MockMvcRequestBuilders
                                .multipart("/diary/regist/photo/{date}", dateString)
                                .file(multipartFile)
                                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                )
                .andExpect(status().isOk());

        mockMvc.perform(
                        MockMvcRequestBuilders
                                .get("/diary/detail/{date}", dateString)
                                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("title").value("테스트 제목"))
                .andExpect(jsonPath("content").value("테스트 내용"))
                .andExpect(jsonPath("photo").isNotEmpty())
                .andExpect(MockMvcResultMatchers.jsonPath("$.photo.length()").value(1));
    }

    @Test
    @DisplayName("일기 작성-사진 여러장")
    @Rollback
    public void createDiary_Pictures() throws Exception {
        String dateString = "2000-01-02";
        String curPath = new File("").getAbsolutePath();
        String filename1 = "\\src\\test\\images\\jeju.jpg";
        String filename2 = "\\src\\test\\images\\profile.jpg";

        File file1 = new File(curPath + filename1);
        File file2 = new File(curPath + filename2);
        MockMultipartFile multipartFile1 = new MockMultipartFile("photos", curPath + filename1, "image/jpg", Files.readAllBytes(file1.toPath()));
        MockMultipartFile multipartFile2 = new MockMultipartFile("photos", curPath + filename2, "image/jpg", Files.readAllBytes(file2.toPath()));

        mockMvc.perform(
                        MockMvcRequestBuilders
                                .multipart("/diary/regist/photo/{date}", dateString)
                                .file(multipartFile1)
                                .file(multipartFile2)
                                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                )
                .andExpect(status().isOk());

        mockMvc.perform(
                        MockMvcRequestBuilders
                                .get("/diary/detail/{date}", dateString)
                                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("title").value("테스트 제목"))
                .andExpect(jsonPath("content").value("테스트 내용"))
                .andExpect(jsonPath("photo").isNotEmpty())
                .andExpect(MockMvcResultMatchers.jsonPath("$.photo.length()").value(2));
    }

    /***********************다이어리 삭제***********************/



    /***********************한달 다이어리 기록 조회***********************/


    /***********************검색 기록 조회***********************/
}
