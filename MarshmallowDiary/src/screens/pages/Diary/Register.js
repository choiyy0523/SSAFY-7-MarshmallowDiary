import React, { useEffect, useState } from 'react';
import { BackHandler, StyleSheet, TextInput, Alert, Text, View, Button, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native'
import Footer from '../../components/component/Footer';
import DayPicker from './DatePicker';
import WeatherPicker from './WeatherPicker';
import { launchImageLibrary } from 'react-native-image-picker';
// import ButtonRegister from '../../components/component/ButtonRegister'
import SelectImages from './SelectImages';
import axios from 'axios'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { set } from 'date-fns';


export default function DiaryRegister() {

  // Asyncstorage에서 토큰을 받고, 토큰이 있으면 토큰을 헤더로 넣어 diary를 post 한다 
  useEffect(() => {
    AsyncStorage.getItem('token', (err, result) => {
      const token = result;
      console.log(token)
    })
  }, [])

  async function Register(token) {
    // const { date } = route.params;
    // const { diaryDetail, setDiaryDetail } = useState()
    // 등록하고나서는 그날 일기 조회 화면으로 보내야함

    axios.post('http://k7a303.p.ssafy.io:9090/api/v1/diary/regist/diary', {
      title: title,
      content: content,
      weather: 1,
      date: '2022-11-08'
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(res => {
        console.log('일기 등록 완료')
        console.log(res.date)

      })
      .catch(err => {
        console.log('일기 등록 실패')
        console.log(err)
      })

    // 이러면 비동기말고 순차적으로 처리되는게 맞나...?
    // axios.post('http://k7a303.p.ssafy.io:9090/api/v1/diary/regist/photo/{date}', {
    //   // 사진 폼데이터
    // }, {
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // })
    //   .then(res => {
    //     console.log('사진 등록 완료')
    //     console.log(res.date)

    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
    // };
  }

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  // const [weather, setWeather] = useState('')
  // const [date, setDate] = useState('')

  return (
    <View style={{ flex: 1 }}>
      <View>
        <View style={styles.block2}>
          {/* 날짜, 날씨, 등록버튼 - 일기장 헤더 */}
          <View style={styles.block}>
            {/* 날짜 */}
            <DayPicker />
            {/* <Text>{year}년  {month}월  {date}일</Text> */}

            {/* 날씨 선택 */}
            {/* <TouchableOpacity TouchableOpacity onPress={WeatherPicker} >
                <Image
                  source={require('../../../assets/images/weather/1_sunny.png')}
                  style={styles.weatherButton}
                />
              </TouchableOpacity> */}
          </View>

          <View style={styles.block3}>
            {/* 글 등록 버튼 */}
            <View>
              <TouchableOpacity onPress={Register}>
                <View style={styles.buttonRegister}>
                  <Text style={styles.buttonText}>등록</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View>
          {/* 제목 */}
          <TextInput
            placeholder="제목을 입력하세요."
            style={styles.titleInput}
            value={title}
            onChangeText={text => setTitle(text)} />

          {/* 사진 첨부
            {/* < View style={styles.imageInput} >
                <TouchableOpacity onPress={SelectImages}>
                  <Image
                    source={require('../../../assets/images/etc/photo.png')}
                    style={styles.imageButton}
                  />
                </TouchableOpacity>
              </View > */}
          {/* <SelectImages /> */}

          {/* 일기 작성 */}
          <TextInput
            placeholder="오늘의 기록을 남겨보세요."
            multiline={true}
            style={styles.diaryInput}
            value={content}
            onChangeText={text => setContent(text)}
          />
        </View>
      </View>
      <Footer />
    </View>
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
  weatherButton: {
    marginHorizontal: 10,
    width: 40,
    height: 40,
    marginVertical: -10,
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
  buttonRegister: {
    borderRadius: 10,
    backgroundColor: '#FFEBA5',
    height: 33,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
  }
});
