import React, { useEffect, useState } from 'react';
import { BackHandler, StyleSheet, TextInput, Alert, Pressable, Modal, Text, View, Button, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native'
import Footer from '../../components/component/Footer';
import WeatherPicker from './WeatherPicker';
import { launchImageLibrary } from 'react-native-image-picker';
// import ButtonRegister from '../../components/component/ButtonRegister'
import SelectImages from './SelectImages';
import axios from 'axios'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { set } from 'date-fns';
import { http } from '../../../api/http'
import { util } from '../../../api/util'


// const ShowPicker = () => {
//   //launchImageLibrary : 사용자 앨범 접근
//   launchImageLibrary({}, (res) => {
//     alert(res.assets[0].uri)
//     const formdata = new FormData()
//     formdata.append('file', res.assets[0].uri);
//     console.log(res);
//   })
// }

export default function DiaryRegister() {

  function Register() {
    http.post('/diary/regist/diary', {
      title: title,
      content: content,
      weather: weather,
      date: date
    })
      .then(res => {
        console.log('일기 등록 완료')
      })
      .catch(err => {
        console.log('일기 등록 실패')
        console.log(date)
        console.log(title)
        console.log(content)
        console.log(weather)
        console.log(err)
      })
  }

  const ShowPicker = () => {
    //launchImageLibrary : 사용자 앨범 접근
    launchImageLibrary({}, (res) => {
      // console.log("왈왈")
      // alert(res.assets[0].uri)
      const formdata = new FormData()
      formdata.append('file', res.assets[0].uri);
      console.log(res);
      console.log("멍멍")
      console.log(date)
      console.log(formdata)

      util.post(`/diary/regist/photo/${date}`, formdata)
        .then(response => {
          if (response) {
            console.log("야옹")
            console.log(response.data)
          }
        })
        .catch((error) => {
          if (error.response) {
            console.log("냐옹")
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log("먀옹")
            console.log(error.request);
          } else {
            console.log("갸옹")
            console.log('Error', error.message);
          }
        })
    })
  }

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [weather, setWeather] = useState(1)

  const getWeather = (weather) => {
    setWeather(weather)
    console.log(weather)
  }

  const date = new Date()
  const day = new Date().getDate()
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  const dayformatted = `${year}년 ${month}월 ${day}일`;
  // const today = `${year}-${month}-${day}`



  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.block2}>
          {/* 날짜, 날씨, 등록버튼 - 일기장 헤더 */}
          <View style={styles.block}>
            {/* 날짜 */}
            <Text style={styles.changeDay}>{dayformatted}</Text>

            {/* 날씨 선택 */}
            <WeatherPicker weather={weather} getWeather={getWeather} />

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

          {/* 사진 첨부*/}
          {/* <Image source={{ uri: photo }} /> */}
          <View style={styles.imageInput}>
            <TouchableOpacity onPress={ShowPicker}>
              <Image
                source={require('../../../assets/images/etc/photo.png')}
                style={styles.imageButton}
              />
            </TouchableOpacity>
          </View >



          {/* 일기 작성 */}
          <TextInput
            placeholder="오늘의 기록을 남겨보세요."
            multiline={true}
            style={styles.diaryInput}
            value={content}
            onChangeText={text => setContent(text)}
          />
        </View>
      </ScrollView >
      <Footer />
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
  buttonRegister: {
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
