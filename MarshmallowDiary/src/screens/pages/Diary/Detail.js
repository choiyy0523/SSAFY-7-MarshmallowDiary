import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  Pressable,
  StyleSheet,
  TextInput,
  Alert,
  Text,
  View,
  Button,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import Footer from '../../components/component/Footer';
import {Icon} from '@rneui/themed';
import {Chip} from '@react-native-material/core';
import WeatherPicker from './WeatherPicker';
import {launchImageLibrary} from 'react-native-image-picker';
import ButtonRegister from '../../components/component/ButtonRegister';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {http} from '../../../api/http';

function Detail({route}) {
  const {targetDate} = route.params;
  // console.log(diaryDate)
  console.log(targetDate);

  /// DB에서 해당 일자 일기 받아오는 코드

  const [diaryDate, setDiaryDate] = useState();
  const [diaryTitle, setDiaryTitle] = useState();
  const [diaryWeather, setDiaryWeather] = useState();
  const [diaryContent, setDiaryContent] = useState();
  const [diaryImage, setDiaryImage] = useState();

  // 날씨 아이콘 동적 렌더링
  const weatherIconPath = {
    1: require('../../../assets/images/weather/1.png'),
    2: require('../../../assets/images/weather/2.png'),
    3: require('../../../assets/images/weather/3.png'),
    4: require('../../../assets/images/weather/4.png'),
    5: require('../../../assets/images/weather/5.png'),
    6: require('../../../assets/images/weather/6.png'),
  };

  useEffect(() => {
    AsyncStorage.getItem(
      'token',
      (err, result) => {
        axios
          .get(
            `http://k7a303.p.ssafy.io:9090/api/v1/diary/detail/${targetDate}`,
            {
              headers: {
                Authorization: `Bearer ${result}`,
              },
            },
          )
          .then(res => {
            console.log('일기 조회 성공');
            console.log(res.data);
            setDiaryDate(res.data.date);
            setDiaryTitle(res.data.title);
            setDiaryWeather(res.data.weather);
            setDiaryContent(res.data.content);
            setDiaryImage(res.data.photo);
          })
          .catch(err => {
            console.log('일기 조회 실패');
            console.log(err);
          });
      },
      [],
    );
  });

  ////

  const targetDay = targetDate;

  // Detail >>> Today로 보내는 코드 // 작업중
  const moveToToday = () => {
    navigation.navigate('Today', {targetDiary: diaryDate});
  };

  // 일기 삭제 기능
  // 삭제 확인 모달
  const [visible, setVisible] = useState(false);
  const openModal = () => {
    setVisible(true);
  };
  const closeModal = () => {
    setVisible(false);
  };

  const [overlap, setOverlap] = useState();
  const navigation = useNavigation();

  function Delete() {
    // 일기 삭제 의사 물어보는 모달 한번 띄워야함

    http
      .post('/diary/delete', {
        date: diaryDate,
      })
      .then(res => {
        console.log('일기 삭제 완료');
        // alert('일기가 삭제되었습니다.')
        setOverlap(false);
        openModal();
        navigation.navigate('Main');
      })
      .catch(err => {
        console.log('일기 삭제 실패');
        console.log(err);
      });
  }

  /// 화면 렌더링
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={{flex: 1}}>
          <View style={styles.block2}>
            {/* 날짜, 날씨, 삭제버튼 - 일기장 헤더 */}
            <View style={styles.block}>
              {/* 날짜 */}
              <Text style={styles.changeDay}>{diaryDate}</Text>

              {/* 날씨 */}
              <Image
                source={weatherIconPath[diaryWeather]}
                style={styles.weatherButton}
              />
              {/* <Text style={styles.changeDay}>{diaryWeather}</Text> */}
            </View>

            <View style={styles.block3}>
              {/* 글 삭제 버튼*/}
              <View style={{marginLeft: '30%'}}>
                <TouchableOpacity onPress={Delete}>
                  <View style={styles.buttonDelete}>
                    <Text style={styles.buttonText}>삭제</Text>
                  </View>
                </TouchableOpacity>
              </View>
              {/* 글 삭제 알림 */}
              <Modal
                visible={visible}
                setVisible={setVisible}
                transparent={true}
                animationType={'fade'}>
                <Pressable
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={closeModal}>
                  <View
                    style={{
                      flex: 0.2,
                      backgroundColor: 'white',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '60%',
                      borderRadius: 30,
                    }}>
                    {overlap ? (
                      <Text style={{fontFamily: 'GangwonEduAllBold'}}>
                        일기가 삭제되었습니다!
                      </Text>
                    ) : (
                      <Text style={{fontFamily: 'GangwonEduAllBold'}}>
                        일기가 삭제되었습니다!
                      </Text>
                    )}
                  </View>
                </Pressable>
              </Modal>
            </View>
          </View>
        </View>

        <View>
          {/* 제목 */}
          <Text style={styles.titleInput}>{diaryTitle}</Text>

          {/* 사진*/}
          {diaryImage == undefined ||
          (diaryImage != undefined && diaryImage.length == 0) ? (
            // 사진 없을 때
            <View style={styles.imageOutput}>
              <TouchableOpacity>
                <Image
                  style={{height: 80, width: 80}}
                  source={require('../../../assets/images/character/positive.png')}
                />
              </TouchableOpacity>
            </View>
          ) : (
            // 사진 있을 때
            <View style={styles.imageOutput}>
              <TouchableOpacity>
                <Image
                  style={{width: 350, height: 300, borderRadius: 20}}
                  source={{
                    uri: `https://marshmallow-bucket.s3.ap-northeast-2.amazonaws.com/${diaryImage[0]}`,
                  }}
                />
              </TouchableOpacity>
            </View>
          )}

          {/* 일기 작성 */}
          <Text multiline={true} style={styles.diaryInput}>
            {diaryContent}
          </Text>
        </View>

        <View
          style={{
            flex: 0.3,
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: '10%',
          }}>
          <Chip
            onPress={moveToToday}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FFEBA5',
              width: '30%',
            }}>
            {/* <Icon name='share' type='fontisto' /> */}
            <Text
              style={{
                fontsize: 10,
                color: '#525252',
                fontFamily: 'GangwonEduAllBold',
              }}>
              {' '}
              분석 결과{' '}
            </Text>
          </Chip>
        </View>
      </ScrollView>

      <Footer />
    </View>
  );
}
const styles = StyleSheet.create({
  block: {
    height: 64,
    paddingVertical: 20,
    marginTop: 10,
    marginHorizontal: 10,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  block2: {
    height: 64,
    marginHorizontal: 15,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  block3: {
    height: 64,
    paddingVertical: 15,
    marginTop: 10,
    marginHorizontal: 85,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  weatherPicker: {
    marginHorizontal: 10,
    width: 40,
    height: 40,
    marginVertical: -10,
  },
  weatherButton: {
    marginHorizontal: 10,
    marginVertical: -10,
    width: 40,
    height: 40,
  },
  buttonText: {
    fontFamily: 'GangwonEduAllBold',
    fontSize: 15,
    fontWeight: 'Bold',
  },
  titleInput: {
    fontSize: 15,
    paddingVertical: 15,
    fontFamily: 'GangwonEduAllBold',
    height: 50,
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(217, 217, 217, 0.3)',
    borderRadius: 18,
    marginTop: 5,
    marginBottom: '3%',
    marginHorizontal: 15,
  },
  imageOutput: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 18,
    marginBottom: '3%',
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageButton: {
    width: 45,
    height: 45,
    opacity: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  diaryInput: {
    fontSize: 15,
    paddingVertical: 15,
    fontFamily: 'GangwonEduAllLight',
    height: 250,
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(217, 217, 217, 0.3)',
    borderRadius: 18,
    marginHorizontal: 15,
    textAlignVertical: 'top',
  },
  buttonDelete: {
    borderRadius: 10,
    backgroundColor: '#FFEBA5',
    height: 33,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
  },
  changeDay: {
    fontSize: 18,
    fontFamily: 'GangwonEduAllBold',
  },
});

export default Detail;
