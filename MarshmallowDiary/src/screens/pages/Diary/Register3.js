import React, { useEffect, useState } from 'react';
import { BackHandler, StyleSheet, TextInput, Alert, Text, View, Button, TouchableOpacity, Image, ScrollView } from 'react-native'
import Footer from '../../components/component/Footer';
import DayPicker from './DatePicker';
import WeatherPicker from './WeatherPicker';
import { launchImageLibrary } from 'react-native-image-picker';
import ButtonRegister from '../../components/component/ButtonRegister'
import axios from 'axios'
// import CancleDialogs from '../../components/modal/Diary/Cancel'

// 사진 선택
const DiaryPhotoUpload = async () => {
  const photos = { uri: '', type: 'image/jpg', name: '', }
  //launchImageLibrary : 사용자 앨범 접근
  await launchImageLibrary({}, res => {
    if (res.didCancel) {
      console.log('사진 선택 취소');
    } else if (res.errorCode) {
      console.log('이미지 선택 오류', res.errorCode);
    }
    // 정상적으로 사진 선택 완료 시
    else if (res.assets) {
      console.log('이미지 선택', res);
      photos.name = res.assets[0].fileName
      photos.type = res.assets[0].type
      photos.uri = res.assets[0].uri
    }
  });

  const formdata = new FormData();
  formdata.append('diaryPhotos', photos);
  const headers = {
    'Content-Type': 'multipart/form-data; boundary=someArbitraryUniqueString',
  };
  console.log(photos);
  console.log(formdata);
  //마지막줄에 formdata.append에서 'diaryPhotos' fieldname으로
  //서버쪽에 multer.single('?????')에 key값(?????)과 같은 역할을 하므로 반드시 일치시켜주자.

  axios.post('https://marshmallowdiary.com/api/diary/regist', formdata, { headers: headers })
    .then(response => {
      if (response) {
        console.log(response.data)
      }
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    })
}


// 다이어리 등록
const DiaryRegister = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  // const [isLoading, setIsLoading] = useState(false);


  const submit = async () => {
    axios.post('https://marshmallowdiary.com/api/diary/regist',
      {
        diary: { title: title, content: content, weather: weather, date: date },
        photos: 
      })
      .then(response => console.log(response.data));
  };


  return (
    <ScrollView >
      {/* <CancleDialogs /> */}
      <View style={styles.block2}>
        {/* 날짜, 날씨, 등록버튼 - 일기장 헤더 */}
        <View style={styles.block}>
          {/* 날짜 선택 */}
          <DayPicker />

          {/* 날씨 선택 */}
          < TouchableOpacity onPress={WeatherPicker} >
            <Image
              source={require('../../../assets/images/weather/1_sunny.png')}
              style={styles.weatherButton}
            />
          </ TouchableOpacity>
        </View>

        <View style={styles.block3}>
          {/* 글 등록 버튼 */}
          < ButtonRegister onPress={() => submit(this)}>
            <Text style={styles.buttonText}>등록</Text>
          </ ButtonRegister>
        </View>
      </View >


      <View>
        {/* 제목 */}
        < TextInput
          placeholder="제목을 입력하세요."
          style={styles.titleInput}
          value={title}
          onChangeText={title => setTitle(title)} />


        {/* 사진 첨부 */}
        < View style={styles.imageInput} >
          <TouchableOpacity onPress={DiaryPhotoUpload}>
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
          onChangeText={content => setContent(content)}
        />

      </View>



      <Footer />

    </ScrollView >
  )
};


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
  }
});

export default DiaryRegister;
