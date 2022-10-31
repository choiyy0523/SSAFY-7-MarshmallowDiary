package com.marshmallow.diary.service;

import com.marshmallow.analysis.entity.Analysis;
import com.marshmallow.analysis.repository.AnaylsisRepository;
import com.marshmallow.diary.dto.DiaryRequest;
import com.marshmallow.diary.dto.DiaryResponse;
import com.marshmallow.diary.dto.MainDiaryInfo;
import com.marshmallow.diary.entity.Diary;
import com.marshmallow.diary.repository.DiaryRepository;
import com.marshmallow.user.entity.User;
import com.marshmallow.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.TemporalAdjuster;
import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
public class DiaryService {


    @Value("${clova.id}")
    private String clientId;

    @Value("${clova.key}")
    private String apiKey;

    private final DiaryRepository diaryRepository;
    private final UserRepository userRepository;

    private final AnaylsisRepository anaylsisRepository;

    private final AwsS3Service awsS3Service;
    public DiaryResponse.Regist registDiary(DiaryRequest.Create request , List<MultipartFile> multipartFile) throws IOException, JSONException {

        User user = userRepository.findById(UUID.fromString("18343747-03f9-414f-b7f2-30090b8954e8")).get();
        String photos = null;
        if(multipartFile != null){
            List<String> photo = awsS3Service.uploadFile(multipartFile);
            photos = photo.toString();
        }
        System.out.println(request.getDate()+" 입력으로 들어온 날짜");
        Diary diary = Diary.DiaryCreate(user, request, photos);
        UUID diaryId = diaryRepository.save(diary).getDiaryId();
        DiaryResponse.Regist response = DiaryResponse.Regist.build(diaryId);

        // 분석 결과 저장

        JSONObject word = new JSONObject();
        word.put("content",diary.getContent());

        String reqUrl = "https://naveropenapi.apigw.ntruss.com/sentiment-analysis/v1/analyze";
        URL url = new URL(reqUrl);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("X-NCP-APIGW-API-KEY-ID",clientId);
        conn.setRequestProperty("X-NCP-APIGW-API-KEY",apiKey);
        conn.setRequestProperty("Content-Type","application/json");
        conn.setDoOutput(true);

        OutputStreamWriter ow = new OutputStreamWriter(conn.getOutputStream());
        ow.write(word.toString());
        ow.flush();
        // 전송 끝

        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        String line = "";
        String result = "";
        while((line = br.readLine()) != null){
            result += line;
        }

        String[] getResult = result.split(",");

        Analysis analysis = new Analysis();

        String sentiment = getResult[0].split(":")[2];
        sentiment = sentiment.substring(1,sentiment.length()-1);
        String negative = getResult[1].split(":")[2];
        String positive = getResult[2].split(":")[1];
        String neutral = getResult[3].split(":")[1];
        neutral = neutral.substring(0,neutral.length()-2);

        analysis.setDiary(diary);
        analysis.setSentiment(sentiment);
        analysis.setNegative(Float.parseFloat(negative));
        analysis.setPositive(Float.parseFloat(positive));
        analysis.setNeutral(Float.parseFloat(neutral));

        anaylsisRepository.save(analysis);

        return response;


    }

    public DiaryResponse.Detail getDetailDiary(UUID diaryId) {
        Optional<Diary> diary = diaryRepository.findById(diaryId);
        if(!diary.isPresent()){
            return null;
        }
        String photo = diary.get().getPhoto();
        photo = photo.substring(1, photo.length()-1);
        String[] photos = photo.split(", ");
        return DiaryResponse.Detail.build(diary.get(), photos);
    }

    public DiaryResponse.Delete delete(UUID diaryId) {
        Optional<Diary> diary = diaryRepository.findById(diaryId);
        if(!diary.isPresent()){
            return DiaryResponse.Delete.build("false");
        }else{
            String photo = diary.get().getPhoto();
            photo = photo.substring(1, photo.length()-1);
            String[] photos = photo.split(", ");
            for(int i = 0; i < photos.length; i++){
                awsS3Service.deleteFile(photos[i]);
            }
            diaryRepository.delete(diary.get());
            return DiaryResponse.Delete.build("true");
        }
    }

    public DiaryResponse.totalDiary searchTotalDiary(DiaryRequest.TotalDiary request) throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Calendar cal = Calendar.getInstance();
        cal.set(request.getYear(), request.getMonth()-1, 1); //월은 -1해줘야 해당월로 인식
        int lastday = cal.getActualMaximum(Calendar.DAY_OF_MONTH);
        String st = request.getYear()+"-"+request.getMonth()+"-1";
        String ed = request.getYear()+"-"+request.getMonth()+"-"+lastday;
        Date startDay = dateFormat.parse(st);
        Date endDay = dateFormat.parse(ed);
        List<Diary> diaryList = diaryRepository.findAllByDateBetween(startDay, endDay);
        List<MainDiaryInfo> list = new ArrayList<>();
        for(Diary d : diaryList){
            Optional<Analysis> analysis = anaylsisRepository.findByDiary_DiaryId(d.getDiaryId());
            String emotion = "분석없음";
            if(!analysis.isEmpty()){
                emotion = analysis.get().getSentiment();
            }
            MainDiaryInfo mainDiaryInfo = MainDiaryInfo.MainDiaryInfoCreate(d.getDate(), d.getDiaryId(), emotion);
            list.add(mainDiaryInfo);
        }
        return DiaryResponse.totalDiary.build(list);

    }
}
