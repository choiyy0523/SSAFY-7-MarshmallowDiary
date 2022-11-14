import React, { useEffect, useState } from 'react';
import { BackHandler, StyleSheet, Dimensions, TextInput, Alert, Pressable, Modal, Text, View, Button, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native'
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
import { useNavigation } from '@react-navigation/native';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
// import ImagePicker from 'react-native-image-crop-picker';


export default function DiaryRegister() {

  const navigation = useNavigation()
  // Register (내용 등록, 사진 등록 순으로 진행) 후 Detail로 보내는 코드
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [weather, setWeather] = useState(1)
  const [selectedImage, setSelectedImage] = useState(null);


  // function showPicker() {
  //   ImagePicker.launchImageLibrary(options, (response) => {
  //     if (response.uri) {
  //       setSelectedImage(response);
  //     }
  //   });
  //   const datas = new FormData();

  //   datas.append('images', {
  //     name: selectedImage.fileName,
  //     type: selectedImage.type,
  //     uri: selectedImage.uri,
  //   });

  //   console.log('닥터')
  //   console.log(datas)
  //   console.log(selectedImage)
  //   console.log('스트레인지')
  // }




  function Register() {
    http.post('/diary/regist/diary', {
      title: title,
      content: content,
      weather: weather,
      date: date
    })
      .then(res => {
        // setDates(date)
        console.log('일기 내용 등록 완료')
        // navigation.navigate('Detail', { targetDate: today })

        util.post(`/diary/regist/photo/${date}`, selectedImage)
          .then(response => {
            if (response) {
              console.log("일기 사진 등록 완료")
              console.log(response.data)
              alert('일기가 등록되었습니다!')
              navigation.navigate('Detail', { targetDate: diarydate })
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

      .catch(err => {
        console.log('일기 내용 등록 실패')
        console.log(err)
      })

  }



  // let renderImage = (file === []) ? `require('../../../assets/images/etc/photo.png')` : { uri: res.assets[0].uri }
  // console.log(renderImage)


  const getWeather = (weather) => {
    setWeather(weather)
    console.log(weather)
  }

  // GMT 기준
  // const date = new Date()
  // const day = new Date().getDate()
  // const month = new Date().getMonth() + 1;
  // const year = new Date().getFullYear();

  // const dayformatted = `${year}년 ${month}월 ${day}일`;
  // const today = `${year}-${month}-${day}`


  /// 한국 시간 기준
  var date = new Date();
  const utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000);
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const kr_date = new Date(utc + KR_TIME_DIFF);

  var year = kr_date.getFullYear();
  var month = ('0' + (kr_date.getMonth() + 1)).slice(-2);
  var day2 = ('0' + kr_date.getDate()).slice(-2);

  const today = year + '-' + month + '-' + day2;
  const dayformatted = `${year}년 ${month}월 ${day2}일`;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
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
            <TouchableOpacity onPress={showPicker}>
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
      </View >
      <View style={{ flex: 0.1 }}>
        {/* <Button title='Home' onPress={() => navigation.navigate('Home')} /> */}
      </View>
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
    marginHorizontal: -25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
  },
  changeDay: {
    fontSize: 18,
  },
});
