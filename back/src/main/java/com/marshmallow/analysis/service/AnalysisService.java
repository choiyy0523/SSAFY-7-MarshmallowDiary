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

import java.text.ParseException;
import java.text.SimpleDateFormat;
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


    public AnalysisResponse.getResult result(UUID diaryId) throws Exception{

        Optional<Analysis> analysis = anaylsisRepository.findByDiary_DiaryId(diaryId);

        return AnalysisResponse.getResult.build(analysis.get());
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

        Random idx = new Random();
        String msg = "";
        String[] maro = {"이렇게 성실하게 일기를 쓰다니! 대단하신데요?","오늘 하루도 같이 마무리 해봐요!", "오늘은 어떤 하루였는지 알려주세요~ 오늘도 좋은 하루였나요?",
            "오늘 하루는 어땠나요?", "또 만났네요! 오늘은 어떤 일이 있었나요?", "일기를 작성하며 하루를 잘 마무리해봐요~"};
        String[] bro = {"오늘은 일기 꼭 쓰실 거죠? 더 이상 미루기는 그만~","오늘 기분은 어떠셨나요? ... 별로?"," 요즘.....잘 지내? 소식이 뜸하네....☆일 없지....?","이번주는 어떻게 보내고 있나요?"," 인간적으로 일주일에 마시멜로 하나는 줘야한다","하나씩 일기를 작성해보는 습관을 길러볼까요?"};
        String[] siro = {"마시멜로 본지가 언제인지~! 반성하세요! ","성실하지 못한 것은 성공하기 싫다는 표현 중 하나래요","얼른 일기 쓰시고 맛난 마시멜로 주세요!!!!!","일기 안쓰면 시로","시로 당떨어진다~~!!","바쁘더라도 일기를 꾸준히 쓰면 도움이 될거에요"};

        int mashmellow = -1;

        if(dist < 3){
            mashmellow = 0;
            msg = maro[idx.nextInt(6)];
        }else if(dist < 8){
            mashmellow = 1;
            msg = bro[idx.nextInt(6)];
        }else{
            mashmellow = 2;
            msg = siro[idx.nextInt(6)];
        }

        result.put(mashmellow,msg);

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

    public AnalysisResponse.getAllEmotion getMonthEmotion(int year, int month) throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Calendar cal = Calendar.getInstance();
        cal.set(year, month-1, 1);
        int lastday = cal.getActualMaximum(Calendar.DAY_OF_MONTH);
        String st = year+"-"+month+"-1";
        String ed = year+"-"+month+"-"+lastday;
        Date startDay = dateFormat.parse(st);
        Date endDay = dateFormat.parse(ed);
        List<Diary> diary = diaryRepository.findAllByDateBetween(startDay, endDay);

        float positive = 0.0f;
        float negative = 0.0f;
        float neutral = 0.0f;

        for(Diary d : diary){
            Optional<Analysis> analysis = anaylsisRepository.findByDiary_DiaryId(d.getDiaryId());
            positive += analysis.get().getPositive();
            negative += analysis.get().getNegative();
            neutral += analysis.get().getNeutral();
        }

        Analysis analysis = new Analysis();
        analysis.setPositive(positive);
        analysis.setNegative(negative);
        analysis.setNeutral(neutral);

        return AnalysisResponse.getAllEmotion.build(analysis);
    }

}
