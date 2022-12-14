package com.marshmallow.analysis.service;

import com.marshmallow.analysis.dto.AnalysisResponse;
import com.marshmallow.analysis.entity.Analysis;
import com.marshmallow.analysis.repository.AnaylsisRepository;
import com.marshmallow.diary.entity.Diary;
import com.marshmallow.diary.repository.DiaryRepository;
import com.marshmallow.music.entity.Music;
import com.marshmallow.music.repository.MusicRepository;
import com.marshmallow.user.entity.User;
import com.marshmallow.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;


@PropertySources({
        @PropertySource("classpath:application.properties"),
        @PropertySource("classpath:application-secure.properties")
})
@Service
public class AnalysisService {

    @Autowired
    AnaylsisRepository anaylsisRepository;

    @Autowired
    DiaryRepository diaryRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    MusicRepository musicRepository;


    public AnalysisResponse.getResult diaryResult(Date date) throws Exception{
        UUID userId = getCurrentUser().getUserId();

        Optional<Diary> diary = diaryRepository.findByUser_UserIdAndDate(userId, date);
        Optional<Analysis> analysis = anaylsisRepository.findByDiary_DiaryId(diary.get().getDiaryId());
        List<Music> musics = musicRepository.findAllByEmotion(analysis.get().getSentiment());
        Music music = new Music();
        if(musics.size() != 0){
            Random idx = new Random();
            music = musics.get(idx.nextInt(musics.size()));
        }
        return AnalysisResponse.getResult.build(analysis.get(), music);
    }

    private User getCurrentUser() {
        String id = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByAccountId(id).orElseThrow();
    }

    public Map<Integer, String> main(){

        Map<Integer, String> result = new HashMap<>();

        UUID userId = getCurrentUser().getUserId();

        Optional<Diary> diary = diaryRepository.findFirstByUser_UserIdOrderByDateDesc(userId);
        System.out.println("?????? "+ diary);

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
        String[] maro = {"????????? ???????????? ????????? ?????????! ???????????????????","?????? ????????? ?????? ????????? ?????????!", "????????? ?????? ??????????????? ???????????????~ ????????? ?????? ????????????????",
            "?????? ????????? ?????????????", "??? ????????????! ????????? ?????? ?????? ?????????????", "????????? ???????????? ????????? ??? ??????????????????~"};
        String[] bro = {"????????? ?????? ??? ?????? ??????? ??? ?????? ???????????? ??????~","?????? ????????? ???????????????? ... ???????"," ??????.....??? ??????? ????????? ?????????....?????? ??????....?","???????????? ????????? ????????? ??????????"," ??????????????? ???????????? ???????????? ????????? ????????????","????????? ????????? ??????????????? ????????? ????????????????"};
        String[] siro = {"???????????? ????????? ????????????~! ???????????????! ","???????????? ?????? ?????? ???????????? ????????? ?????? ??? ????????????","?????? ?????? ????????? ?????? ???????????? ?????????!!!!!","?????? ????????? ??????","?????? ???????????????~~!!","??????????????? ????????? ????????? ?????? ????????? ????????????"};

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
        LocalDate st = LocalDate.of(LocalDate.now().getYear(),  LocalDate.now().getMonth().minus(1), 1);

        LocalDate ed = LocalDate.of(LocalDate.now().getYear(), LocalDate.now().getMonth().minus(1), 31);

        Date start = java.sql.Date.valueOf(st);
        Date end = java.sql.Date.valueOf(ed);

        UUID userId = getCurrentUser().getUserId();
        System.out.println("??????"+LocalDate.now());
        System.out.println("?????????"+start);
        System.out.println("???"+end);
        List<Diary> diary = diaryRepository.findAllByUser_UserIdAndDateBetweenOrderByDate(userId, start, end);

        String idx = "-1";
        String date = "-1";

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
                positive = analysis.get().getPositive();
                idx = analysis.get().getDiary().getDiaryId().toString();
                date = String.valueOf(analysis.get().getDiary().getDate());
            }
        }

        return AnalysisResponse.getdiaryId.build(idx, date);
    }

    public AnalysisResponse.getReport getAllEmotion(){

        UUID userId = getCurrentUser().getUserId();
        List<Diary> diaries = diaryRepository.findAllByUser_UserId(userId);

        float positive = 0.0f;
        float negative = 0.0f;
        float neutral = 0.0f;
        int pCnt = 0;
        int negCnt = 0;
        int neuCnt = 0;
        String bDate = "-1";
        float bestP = 0.0f;

        for(Diary d : diaries){
            UUID diaryId = d.getDiaryId();
            Optional<Analysis> analysis = anaylsisRepository.findByDiary_DiaryId(diaryId);

            if(analysis.get().getSentiment().equals("positive")){
                pCnt++;
                if(analysis.get().getPositive() > bestP){
                    bestP = analysis.get().getPositive();
                    bDate = String.valueOf(analysis.get().getDiary().getDate());
                }
            }else if(analysis.get().getSentiment().equals("negative")){
                negCnt++;
            }else{
                neuCnt++;
            }

            positive+=analysis.get().getPositive();
            negative+=analysis.get().getNegative();
            neutral+=analysis.get().getNeutral();
        }

        Analysis result = new Analysis();
        result.setPositive(positive);
        result.setNeutral(neutral);
        result.setNegative(negative);

        return AnalysisResponse.getReport.build(positive, negative, neutral, pCnt, negCnt, neuCnt, bDate);

    }

    public AnalysisResponse.getReport getMonthEmotion(int year, int month) throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Calendar cal = Calendar.getInstance();
        cal.set(year, month-1, 1);
        int lastday = cal.getActualMaximum(Calendar.DAY_OF_MONTH);
        String st = year+"-"+month+"-1";
        String ed = year+"-"+month+"-"+lastday;
        Date startDay = dateFormat.parse(st);
        Date endDay = dateFormat.parse(ed);


        UUID userId = getCurrentUser().getUserId();
        List<Diary> diary = diaryRepository.findAllByUser_UserIdAndDateBetweenOrderByDate(userId, startDay, endDay);

        float positive = 0.0f;
        float negative = 0.0f;
        float neutral = 0.0f;
        int pCnt = 0;
        int negCnt = 0;
        int neuCnt = 0;
        String bDate = "-1";
        float bestP = 0.0f;

        for(Diary d : diary){
            Optional<Analysis> analysis = anaylsisRepository.findByDiary_DiaryId(d.getDiaryId());

            if(analysis.get().getSentiment().equals("positive")){
                pCnt++;
                if(analysis.get().getPositive() > bestP){
                    bestP = analysis.get().getPositive();
                    bDate = String.valueOf(analysis.get().getDiary().getDate());
                }
            }else if(analysis.get().getSentiment().equals("negative")){
                negCnt++;
            }else{
                neuCnt++;
            }
            positive += analysis.get().getPositive();
            negative += analysis.get().getNegative();
            neutral += analysis.get().getNeutral();
        }


        return AnalysisResponse.getReport.build(positive, negative, neutral, pCnt, negCnt, neuCnt, bDate);
    }

}
