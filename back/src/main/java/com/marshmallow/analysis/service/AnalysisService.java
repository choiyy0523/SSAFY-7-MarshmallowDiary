package com.marshmallow.analysis.service;

import com.marshmallow.analysis.dto.AnalysisResponse;
import com.marshmallow.analysis.entity.Analysis;
import com.marshmallow.analysis.repository.AnaylsisRepository;
import com.marshmallow.diary.entity.Diary;
import com.marshmallow.diary.repository.DiaryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;


@PropertySources({
        @PropertySource("classpath:application.properties"),
        @PropertySource("classpath:application-secure.properties")
})
@Service
@RequiredArgsConstructor
public class AnalysisService {

    @Autowired
    AnaylsisRepository anaylsisRepository;

    @Autowired
    DiaryRepository diaryRepository;

    @Value("${clova.id}")
    private String clientId;

    @Value("${clova.key}")
    private String apiKey;

    public AnalysisResponse.getResult result(UUID diaryId) throws Exception{

        Optional<Analysis> analysis = anaylsisRepository.findByDiary_DiaryId(diaryId);

        if(analysis.isEmpty()){
            getEmotion(diaryId);
        }

        return AnalysisResponse.getResult.build(analysis.get());
    }


    public void getEmotion(UUID diaryId) throws Exception{

        Optional<Diary> diary = diaryRepository.findById(diaryId);

        JSONObject word = new JSONObject();
        word.put("content",diary.get().getContent());

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

        analysis.setDiary(diary.get());
        analysis.setSentiment(sentiment);
        analysis.setNegative(Float.parseFloat(negative));
        analysis.setPositive(Float.parseFloat(positive));
        analysis.setNeutral(Float.parseFloat(neutral));

        anaylsisRepository.save(analysis);

    }

    public Map<Integer, String> main(){

        Map<Integer, String> result = new HashMap<>();

        Optional<Diary> diary = diaryRepository.findFirstByOrderByDateDesc();

        long currTime = System.currentTimeMillis();
        long regTime;

        if(diary.isEmpty()){
            regTime = currTime;
        }else{
            regTime = diary.get().getDate().getTime();
        }

        long dist = (currTime-regTime)/(1000*60*60*24);

        int mashmellow = 2;

        if(dist < 3){
            mashmellow = 0;
        }else if(dist < 8){
            mashmellow = 1;
        }

        result.put(mashmellow, "DB에서 불러와서 랜덤으로 보내기");

        return result;
    }

    public AnalysisResponse.getdiaryId getdiaryId() throws Exception{
        LocalDate st = LocalDate.of(LocalDate.now().getYear(), LocalDate.now().getDayOfMonth()-1, 1);
        LocalDate ed = LocalDate.of(LocalDate.now().getYear(), LocalDate.now().getDayOfMonth(), 31);

        Date start = java.sql.Date.valueOf(st);
        Date end = java.sql.Date.valueOf(ed);


        List<Diary> diary = diaryRepository.findAllByDateBetween(start, end);

        String idx = "-1";

        for(Diary d : diary){
            Optional<Analysis> analysis = anaylsisRepository.findByDiary_DiaryId(d.getDiaryId());
            if(analysis.isEmpty()){
              idx = "-1";
            }

            if(!analysis.get().getSentiment().equals("positive")){
                continue;
            }

            float positive = 0.0f;

            if(analysis.get().getPositive() > positive){
                idx = analysis.get().getDiary().getDiaryId().toString();
            }
        }

        return AnalysisResponse.getdiaryId.build(idx);
    }

    public AnalysisResponse.getAllEmotion getAllEmotion(){

        List<Analysis> analyses = anaylsisRepository.findAll();

        float positive = 0.0f;
        float negative = 0.0f;
        float neutral = 0.0f;

        for(Analysis a : analyses){
            positive+=a.getPositive();
            negative+=a.getNegative();
            neutral+=a.getNeutral();
        }

        Analysis result = new Analysis();
        result.setPositive(positive);
        result.setNeutral(neutral);
        result.setNegative(negative);

        return AnalysisResponse.getAllEmotion.build(result);

    }

}
