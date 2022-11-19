import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  Image,
  Modal,
  Button,
  Pressable,
  StyleSheet,
  ScrollView,
  Linking,
} from 'react-native';
import {Icon} from '@rneui/themed';
import {Chip} from '@react-native-material/core';
import Footer from '../../components/component/Footer';
import mm_positive from '../../../assets/images/mm/mm_positive.png';
import mm_neutral from '../../../assets/images/mm/mm_neutral.png';
import mm_negative from '../../../assets/images/mm/mm_negative.png';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {http} from '../../../api/http';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import openURL from './OpenUrl';
import {TouchableOpacity} from 'react-native-gesture-handler';

/// DB에서 해당 일자 일기 분석 결과 GET
const Today = ({route}) => {
  const {targetDiary} = route.params;

  var todayDate = targetDiary;
  //2022-11-10
  //0123456789

  const TodayYear = todayDate.substr(0, 4);
  const TodayMonth = todayDate.slice(5, 7);
  const TodayDay = todayDate.substr(8);

  const dayformatted2 = `${TodayYear}년 ${TodayMonth}월 ${TodayDay}일`;

  const [todayNegative, setTodayNegative] = useState();
  const [todayNeutral, setTodayNeutral] = useState();
  const [todayPositive, setTodayPositive] = useState();
  const [todaySinger, setTodaySinger] = useState();
  const [todayTitle, setTodayTitle] = useState();
  const [todayUrl, setTodayUrl] = useState();

  const youtubeUrl = '' + todayUrl; // 강제 스트링 변환
  const youtubeId = youtubeUrl.substr(32);
  const youtubeThumbnail = `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`;

  useEffect(() => {
    AsyncStorage.getItem('token', (err, result) => {
      axios
        .get(`http://k7a303.p.ssafy.io:9090/api/v1/analysis/${targetDiary}`, {
          headers: {
            Authorization: `Bearer ${result}`,
          },
        })
        .then(res => {
          console.log('그날 일기 분석결과 조회 성공');
          setTodayNegative(res.data.negative);
          setTodayNeutral(res.data.neutral);
          setTodayPositive(res.data.positive);
          setTodaySinger(res.data.singer);
          setTodayTitle(res.data.title);
          setTodayUrl(res.data.url);
        })
        .catch(err => {
          console.log('그날 일기 분석결과 조회 실패');
          console.log(err);
        });
    });
  }, []);

  //캡처 및 공유
  const captureRef = useRef();

  const getPhotoUri = async (): Promise<string> => {
    const uri = await captureRef.current.capture();
    console.log(uri);
    return uri;
  };

  const onCapture = async () => {
    try {
      const uri = await getPhotoUri();

      const options = {
        title: 'title',
        message: 'message',
        url: uri,
        type: 'image/jpeg',
        failOnCancel: false,
      };

      const result = await Share.open(options);
      // .then((res) => {
      //   console.log(res)
      //   if (res.message == 'CANCELED') {
      //     Share.open({ title: 'title', message: 'https://play.google.com/store/apps/details?id=com.marshmallowdiary' })
      //       .then(res => {
      //         console.log(res)
      //       })
      //       .catch(err => {
      //         console.log(err)
      //       })
      //   }
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
    } catch (err) {
      console.log('failed', err);
    }
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <ViewShot
          style={{flex: 1, backgroundColor: '#FFF9F8'}}
          ref={captureRef}
          options={{fileName: 'MarshmallowDiary', format: 'jpg', quality: 0.9}}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '15%',
            }}>
            <Text style={{fontSize: 25, fontFamily: 'GangwonEduAllBold'}}>
              {dayformatted2}
            </Text>
            <Text style={{fontSize: 30, fontFamily: 'GangwonEduAllBold'}}>
              감정 분석 결과
            </Text>
          </View>

          <View style={styles.vertical}>
            <View style={styles.horizontal}>
              <Image
                source={require('../../../assets/images/mm/mm_positive.png')}
                style={styles.mmSize}
              />
              <Text style={styles.horizontalText}>{todayPositive}%</Text>
            </View>

            <View style={styles.horizontal}>
              <Image
                source={require('../../../assets/images/mm/mm_neutral.png')}
                style={styles.mmSize}
              />
              <Text style={styles.horizontalText}>{todayNeutral}%</Text>
            </View>

            <View style={styles.horizontal}>
              <Image
                source={require('../../../assets/images/mm/mm_negative.png')}
                style={styles.mmSize}
              />
              <Text style={styles.horizontalText}>{todayNegative}%</Text>
            </View>
          </View>

          <View
            style={{
              flex: 1.5,
              fontsize: 30,
              color: '#999696',
              marginTop: 20,
              fontFamily: 'GangwonEduAllBold',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 20,
            }}>
            <Text
              style={{
                fontsize: 30,
                color: '#999696',
                marginVertical: 20,
                fontFamily: 'GangwonEduAllBold',
              }}>
              {' '}
              🎵 오늘의 추천 노래🎵{' '}
            </Text>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '5%',
                marginHorizontal: '10%',
                flexDirection: 'row',
              }}>
              <Image
                source={{uri: youtubeThumbnail}}
                style={{
                  width: '50%',
                  height: '100%',
                  marginHorizontal: '5%',
                  marginTop: '5%',
                }}
              />

              <View
                style={{
                  width: '50%',
                }}>
                <Text
                  style={{
                    fontsize: 10,
                    color: '#999696',
                    marginTop: 10,
                    fontFamily: 'GangwonEduAllBold',
                    marginLeft: 10,
                  }}>
                  {todaySinger}
                </Text>
                <Text
                  style={{
                    fontsize: 10,
                    color: '#999696',
                    marginTop: 10,
                    marginLeft: 10,
                    fontFamily: 'GangwonEduAllBold',
                  }}>
                  {todayTitle}
                </Text>
                <TouchableOpacity>
                  <Text
                    onPress={url => openURL(todayUrl)}
                    style={{
                      fontsize: 10,
                      color: '#999696',
                      marginTop: 10,
                      marginLeft: 10,
                      fontFamily: 'GangwonEduAllBold',
                    }}>
                    🎬 유튜브 바로가기
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* 
            <YouTube
              videoId="6H8QHeC_VPs"
              apiKey="AIzaSyBIl_RoMETu6Rz7yE2vBap1-u7SuiwYXNM"
              play={true}
              fullscreen={false}
              style={{width: '100%', height: 300}}
            /> */}
          </View>
        </ViewShot>

        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Chip
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FFEBA5',
              width: '30%',
              marginTop: '15%',
            }}
            onPress={onCapture}>
            <Icon name="share" type="fontisto" />
            <Text style={{fontSize: 17, fontFamily: 'GangwonEduAllBold'}}>
              {' '}
              공유하기{' '}
            </Text>
          </Chip>
        </View>
      </ScrollView>

      <Footer />
    </View>
  );
};

export default Today;

const styles = StyleSheet.create({
  vertical: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 25,
    fontFamily: 'GangwonEduAllBold',
  },
  horizontal: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 43,
    paddingHorizontal: 13,
    fontSize: 20,
    fontFamily: 'GangwonEduAllBold',
  },
  horizontalText: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: 43,
    paddingHorizontal: 13,
    fontSize: 20,
    fontFamily: 'GangwonEduAllBold',
  },
  mmSize: {
    height: 65,
    width: 65,
  },
  block3: {
    height: 40,
    paddingVertical: 15,
    marginTop: 10,
    marginHorizontal: 85,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});
