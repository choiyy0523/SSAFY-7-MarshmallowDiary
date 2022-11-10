import React, { useEffect, useState } from 'react';
import { BackHandler, StyleSheet, TextInput, Alert, Text, View, Button, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native'
import DiaryPictureCarousel from './DiaryPictureCarousel';
import Footer from '../../components/component/Footer';
import { Icon } from '@rneui/themed';
import { Chip } from "@react-native-material/core";
import WeatherPicker from './WeatherPicker';
import { launchImageLibrary } from 'react-native-image-picker';
import ButtonRegister from '../../components/component/ButtonRegister'
import SelectImages from './SelectImages';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { http } from '../../../api/http'



function Detail({ route }) {
  const { targetDate } = route.params
  // console.log(diaryDate)
  console.log(targetDate)

  /// DB에서 해당 일자 일기 받아오는 코드

  const [diaryDate, setDiaryDate] = useState()
  const [diaryTitle, setDiaryTitle] = useState()
  const [diaryWeather, setDiaryWeather] = useState()
  const [diaryContent, setDiaryContent] = useState()


  // const todayDate = diaryDate.substr(10)


  useEffect(() => {
    AsyncStorage.getItem('token', (err, result) => {
      axios.get(`http://k7a303.p.ssafy.io:9090/api/v1/diary/detail/${targetDate}`,
        {
          headers: {
            Authorization: `Bearer ${result}`
          }
        })
        .then((res) => {
          console.log('일기 조회 성공')
          console.log(res.data)
          setDiaryDate(res.data.date)
          setDiaryTitle(res.data.title)
          setDiaryWeather(res.data.weather)
          setDiaryContent(res.data.content)
        })
        .catch(err => {
          console.log('일기 조회 실패')
          console.log(err)
        })
    }, [])
  })


  ////

  const targetDay = targetDate

  console.log('초코초코')
  console.log(targetDay)
  console.log(typeof (targetDay))

  console.log('마시멜로')
  console.log(diaryDate)
  console.log(typeof (diaryDate))

  // Detail >>> Today로 보내는 코드 // 작업중
  const moveToToday = () => {
    navigation.navigate('Today', { targetDiary: diaryDate })
  }


  // 일기 삭제 기능
  const navigation = useNavigation()

  function Delete() {


    // 일기 삭제 의사 물어보는 모달 한번 띄워야함

    http.post('/diary/delete', {
      date: diaryDate
    })
      .then(res => {
        console.log('일기 삭제 완료')
        alert('일기가 삭제되었습니다.')
        navigation.navigate('Main')
      })
      .catch(err => {
        console.log('일기 삭제 실패')
        console.log(err)
      })
  }


  /// 화면 렌더링
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.block2}>
          {/* 날짜, 날씨, 삭제버튼 - 일기장 헤더 */}
          <View style={styles.block}>
            {/* 날짜 */}
            <Text style={styles.changeDay}>{diaryDate}</Text>

            {/* 날씨 */}
            <Image
              source={require('../../../assets/images/weather/1.png')}
              style={styles.weatherButton}
            />
            <Text style={styles.changeDay}>{diaryWeather}</Text>
          </View>

          <View style={styles.block3}>
            {/* 글 삭제 버튼*/}
            <View>
              <TouchableOpacity onPress={Delete}>
                <View style={styles.buttonDelete}>
                  <Text style={styles.buttonText}>삭제</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View>
          {/* 제목 */}
          <Text style={styles.titleInput}>
            {diaryTitle}
          </Text>

          {/* 사진 첨부*/}

          {/* 일기 작성 */}
          <Text
            multiline={true}
            style={styles.diaryInput}>
            {diaryContent}
          </Text>
        </View>
      </ScrollView >


      <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
        <Chip onPress={moveToToday} style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFEBA5', width: '30%' }} >
          {/* <Icon name='share' type='fontisto' /> */}
          <Text style={{ fontSize: 17 }}>  분석 결과 </Text>
        </Chip>
      </View>

      {/* <Footer /> */}
    </View >
  )
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
    alignItems: 'flex-end'
  },
  weatherPicker: {
    marginHorizontal: 10,
    width: 40,
    height: 40,
    marginVertical: -10,
  },
  weatherButton: {
    width: 40,
    height: 40,
  },
  buttonText: {
    // fontFamily: 'GangwonEduAllBold',
    fontSize: 15,
    fontWeight: 'Bold'
  },
  titleInput: {
    fontSize: 15,
    paddingVertical: 8,
    // fontFamily: 'GangwonEduAllBold',
    height: 50,
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(217, 217, 217, 0.3)',
    borderRadius: 18,
    marginTop: 5,
    marginBottom: 20,
    marginHorizontal: 15,
  },
  imageInput: {
    paddingVertical: 8,
    height: 100,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(217, 217, 217, 0.3)',
    borderRadius: 18,
    marginBottom: 20,
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageButton: {
    width: 45,
    height: 45,
    opacity: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  diaryInput: {
    fontSize: 15,
    paddingVertical: 15,
    // fontFamily: 'GangwonEduAllLight',
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
  },
});

export default Detail;