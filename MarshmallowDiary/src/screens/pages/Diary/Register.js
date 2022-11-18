import React, { useEffect, useState, useFocusEffect, useCallback, useRoute } from 'react';
import { BackHandler, StyleSheet, Dimensions, TextInput, Alert, Pressable, Modal, Text, View, Button, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native'
import Footer from '../../components/component/Footer';
import WeatherPicker from './WeatherPicker';
import { launchImageLibrary } from 'react-native-image-picker';
// import ButtonRegister from '../../components/component/ButtonRegister'
import axios from 'axios'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { set } from 'date-fns';
import { http } from '../../../api/http'
import { util } from '../../../api/util'
import { useNavigation } from '@react-navigation/native';
// import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
// import ImagePicker from 'react-native-image-crop-picker';


function DiaryRegister() {

  const navigation = useNavigation()
  // Register (내용 등록, 사진 등록 순으로 진행) 후 Detail로 보내는 코드
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [weather, setWeather] = useState(1)
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [thumbnailImage, setThumbnailImage] = useState(null);
  console.log(thumbnailImage)
  console.log(selectedImage)
  console.log('콜라사탕')

  // 라이브러리에서 사진 선택
  const UploadImage = async () => {
    const image = {
      uri: '',
      type: 'image/jpeg',
      name: 'test',
    };
    await launchImageLibrary({ maxWidth: 1024, maxHeight: 1024 }, res => { // 가로 세로 중 최대 크기 1024로 limit 설정
      console.log(thumbnailImage)
      console.log(selectedImage)
      console.log('레몬사탕')
      if (res.didCancel) {
        console.log('사진 등록을 취소했습니다. ');
        console.log(thumbnailImage)
        console.log(selectedImage)
        console.log('마시멜로는 살안쪄')
        setSelectedImage(null)
        setThumbnailImage(null)
      }
      else if (res.errorCode) {
        console.log('사진 선택 오류 : ', res.errorCode);
      }
      else if (res.assets) { //정상적으로 사진을 반환 받았을 때
        console.log('사진 선택 성공', res);
        image.name = res.assets[0].fileName;
        image.type = res.assets[0].type;
        image.uri = res.assets[0].uri;
        const formdata = new FormData();
        formdata.append('photos', image);
        const selectedImage = formdata
        setSelectedImage(selectedImage)
        setThumbnailImage(image.uri)
        // 이게 여기 안에 있는게 스토어 코드 (스토어 설치 정상작동, 에뮬 에러발생(버킷사진등록안됨)) ver.1 >> 시연기기 apk 에러발생
   
      }

    })

        // 이게 여기 밖에 있는게 현재 고민중인 코드 (스토어 설치 정상작동여부 알 수 없음, 에뮬 정상작동) ver.2
        // const formdata = new FormData();
        // formdata.append('photos', image);
        // const selectedImage = formdata
        // setSelectedImage(selectedImage)
        // setThumbnailImage(image.uri)

    const headers = {
      'Content-Type': 'multipart/form-data'
    };
    console.log('모짜')
    console.log('렐라')
    console.log(selectedImage)
  }

  const [count, setCount] = useState(0)
  const countUp = () => {
    console.log(count)
    console.log("개구리")
    setCount(count + 1)
    if (count == 1) {
      setSelectedImage(null)
      console.log("치즈")
      console.log(selectedImage)
      setCount(0)
    }
  }


  function Register() {
    http.post('/diary/regist/diary', {
      title: title,
      content: content,
      weather: weather,
      date: today
    })
      .then(res => {
        // 일단 만약 글이나 내용이 비었으면 얼럿
        if (title === null && content === null) {
          alert('제목과 일기는 반드시 쓰셔야 합니다!')
          console.log("슈붕")
          null
        }
        // 글과 내용은 다 썼고, 
         else {
          // 만약 선택된 이미지가 있다면 사진 등록도 같이 처리
          if (selectedImage != undefined) {
          // setDates(date)
          console.log('일기 내용 등록 완료')
          // navigation.navigate('Detail', { targetDate: today })
  
                // 사진 Formdata 처리
                util.post(`/diary/regist/photo/${today}`, selectedImage)
                .then(response => {
                  if (response) {
                    console.log("일기 사진 등록 완료")
                    console.log(response.data)
                    alert('일기가 등록되었습니다!') // 모달로 변경해야함
      
                    navigation.replace('Detail', { targetDate: today })
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
    } else {
  // 사진이 없다면 일기만 등록
  console.log('일기 내용만 등록 완료')
  alert("일기가 등록되었습니다!")
  navigation.navigate('Detail', { targetDate: today })
    }
}

      })

      .catch(err => {
        console.log('일기 등록 실패')
        console.log(err)
        console.log("팥붕")
        alert('제목과 일기내용은 반드시 쓰셔야 합니다!')
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

  const today = year + '-' + month + '-' + day2; // 사진 넘기고 detail navigation용
  const dayformatted = `${year}년 ${month}월 ${day2}일`; // register 화면표시용

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
          {selectedImage == undefined || (selectedImage != undefined && selectedImage.length === 0) ? // 사진이 없다
            // 사진 없다면 (true)
            <View style={styles.imageInput}>
              <TouchableOpacity onPress={UploadImage}>
                <Image
                  source={require('../../../assets/images/etc/photo.png')}
                  style={styles.imageButton}
                />

              </TouchableOpacity>


              <Text style={{ fontsize: 10, color: "#999696", marginTop: 10, fontFamily: 'GangwonEduAllBold' }}>
                오늘을 사진 한 장으로 표현한다면?
              </Text>
            </View >
            :
            // 사진 있다면 (false)
            <View style={styles.imageInput2}>
              <TouchableOpacity onPress={countUp} >
                <Image
                  source={{ uri: thumbnailImage }}
                  style={{ width: 300, height: 200, borderRadius: 20 }}
                />
              </TouchableOpacity>
              <Text style={{ fontsize: 10, color: "#999696", marginTop: 10, fontFamily: 'GangwonEduAllBold' }}>
                2번 터치하면 사진이 삭제됩니다!
              </Text>
            </View >

          }
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
    fontFamily: 'GangwonEduAllBold',
    fontSize: 15,
    fontWeight: 'Bold'
  },
  titleInput: {
    fontSize: 15,
    paddingVertical: 8,
    fontFamily: 'GangwonEduAllBold',
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
    height: 120,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(217, 217, 217, 0.3)',
    borderRadius: 18,
    marginBottom: 20,
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageInput2: {
    paddingVertical: 8,
    height: 200,
    paddingHorizontal: 16,
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
    fontFamily: 'GangwonEduAllLight',
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
    fontFamily: 'GangwonEduAllBold'
  },
});

export default DiaryRegister
